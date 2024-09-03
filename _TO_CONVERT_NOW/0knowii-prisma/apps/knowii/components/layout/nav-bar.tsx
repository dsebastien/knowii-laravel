import { Box, Button, Container, HStack, IconButton, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { ColorModeSwitch, LanguageSwitch, Logo, Menu, MobileDrawerMenu, useMobileBreakpoint, useScrollTop } from '@knowii/client-ui';
import { UserMenu } from './user-menu';
import { useTranslations } from 'next-intl';
import { SIGN_IN_URL } from '@knowii/common';

interface NavBarProps {
  hideMenu?: boolean;
}

export function NavBar({ hideMenu }: NavBarProps) {
  const t = useTranslations('navBar');

  const user = useUser();
  const mobileDrawerDisclosure = useDisclosure();
  const isMobile = useMobileBreakpoint();
  const isTop = useScrollTop();
  const bgColor = useColorModeValue('primary.100', 'blue.900');

  useEffect(() => {
    if (!isMobile && mobileDrawerDisclosure.isOpen) mobileDrawerDisclosure.onClose();
  }, [isMobile, mobileDrawerDisclosure]);

  return (
    <>
      <Box
        position="fixed"
        inset={0}
        bottom="auto"
        h={20}
        as="nav"
        bg={isTop ? 'transparent' : bgColor}
        px={4}
        py={6}
        shadow={isTop ? 'none' : 'sm'}
        zIndex={99}
      >
        <Container maxW="5xl">
          <HStack spacing={8} justify="space-between">
            <HStack spacing={6}>
              <Logo />
              {!hideMenu && <Menu mobileMode={false} />}
            </HStack>
            <HStack spacing={4}>
              <HStack>
                <LanguageSwitch />
                <ColorModeSwitch />
              </HStack>
              {user ? (
                <UserMenu />
              ) : (
                <Button as={Link} href={SIGN_IN_URL} size="sm" colorScheme="primary" variant="outline">
                  {t('signIn')}
                </Button>
              )}
              {!hideMenu && isMobile && (
                <IconButton aria-label={t('title')} variant="outline" onClick={mobileDrawerDisclosure.onToggle}>
                  <FaBars />
                </IconButton>
              )}
            </HStack>
          </HStack>
        </Container>
      </Box>
      <MobileDrawerMenu {...mobileDrawerDisclosure} />
    </>
  );
}

export default NavBar;
