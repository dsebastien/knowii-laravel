import { useEffect, useRef } from 'react';
import {
  ForgotPasswordForm,
  Logo,
  ResetPasswordForm,
  SigninForm,
  SignupForm,
} from '@knowii/client-ui';
import {
  forbiddenUsernameCharactersRegex,
  AuthAction,
  Database,
  isValidAuthAction,
  minLengthUsername,
  SIGN_IN_URL,
  API_USERNAME_AVAILABILITY_CHECK,
  IsUsernameAvailableRequest,
  IsUsernameAvailableResponse,
  APP_BASE_URL,
} from '@knowii/common';


export default function AuthPage() {
  const lastAbortController = useRef<AbortController | null>();

  const verifyUsernameAvailability = async (abortController: AbortController) => {
    setCheckingUsernameAvailability(true);

    setIsUsernameAvailable(await checkIfUsernameIsAvailable(username, abortController.signal));

    if (lastAbortController.current) {
      lastAbortController.current = null;
    }

    setCheckingUsernameAvailability(false);
  };

  useEffect(() => {
    // When a new request is going to be issued,
    // the first thing to do is cancel the previous one
    lastAbortController.current?.abort();

    // Create new AbortController for the new request and store it in the ref
    const currentAbortController = new AbortController();
    lastAbortController.current = currentAbortController;

    verifyUsernameAvailability(currentAbortController);
  }, [usernameToCheck]);

  const checkIfUsernameIsAvailable = async (username: string, signal?: AbortSignal): Promise<boolean> => {
    if (username.trim().length < minLengthUsername) {
      return false;
    }

    if (forbiddenUsernameCharactersRegex.test(username)) {
      return false;
    }

    console.log('Checking username availability');

    const requestBody: IsUsernameAvailableRequest = {
      usernameToCheck: username,
    };

    try {
      const response = await fetch(API_USERNAME_AVAILABILITY_CHECK, {
        signal,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      //console.log('Response: ', response);

      if (response.ok) {
        const responseBody: IsUsernameAvailableResponse = await response.json();

        if (!responseBody.data) {
          return false;
        }

        if (responseBody.data.isUsernameAvailable) {
          console.log('Username is available');
          return true;
        }

        return false;
      }
    } catch (error) {
      // FIXME handle error cases
      console.error(error);
    }

    return false;
  };

  return (
    <>
      <Box ('gray.50', 'gray.900')} w="full">
        <Flex
          align="center"
          justify="center"
          px={6}
          py={12}
          bg=('white', 'gray.800')}
          maxW={{ base: 'full', lg: '50%' }}
          minH="100vh"
        >
          <Container maxW="lg">
            <VStack align="stretch" spacing={12}>
              <Logo />
              {props.action === 'signup' && (
                <SignupForm
                  checkingUsernameAvailability={checkingUsernameAvailability}
                  isUsernameAvailable={isUsernameAvailable}
                  checkUsernameAvailability={setUsername}
                  enabledAuthProviders={props.enabledAuthProviders}
                />
              )}
              {props.action === 'signin' && <SigninForm enabledAuthProviders={props.enabledAuthProviders} />}
              {props.action === 'forgot-password' && <ForgotPasswordForm />}
              {props.action === 'reset-password' && <ResetPasswordForm />}

              <div className="">
                <span className="py-2 bg-gray-500">© Knowii. All rights reserved.</span>
              </div>
            </VStack>
          </Container>
        </Flex>
      </Box>
    </>
  );
}
