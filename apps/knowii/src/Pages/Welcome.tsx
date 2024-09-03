import { Head, Link } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import React from 'react';
import { DASHBOARD_URL, HOME_URL, LOGIN_URL, REGISTER_URL, useTypedPage } from '@knowii/common';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Button } from 'primereact/button';

interface WelcomePageProps {
  canLogin: boolean;
  canRegister: boolean;
  laravelVersion: string;
  phpVersion: string;
}

export default function Welcome({ canLogin, canRegister }: WelcomePageProps) {
  const route = useRoute();
  const page = useTypedPage();

  return (
    <>
      <Head title="Welcome" />

      <div className="bg-gray-50 text-black/80 full-page">
        <header
          className="p-4 md:p-6 lg:p-12 bg-gray-800 flex flex-col md:flex-row flex-wrap items-center justify-between">
            <ApplicationLogo />
          {canLogin ? (
            <>
              <div className="flex flex-row">
                <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                  {page.props.auth.user ? (
                    <Button className="text-3xl font-mono font-bold px-8">
                      <Link href={route(DASHBOARD_URL)} className="">Dashboard</Link>
                    </Button>) : (
                    <>
                      <Link href={route(LOGIN_URL} className="">
                        <Button className="text-3xl font-mono">
                          Login
                        </Button>
                      </Link>
                      {canRegister &&
                        <Link href={route(REGISTER_URL} className=""><Button
                          className="text-3xl font-mono font-bold px-8">Register
                        </Button></Link>}
                    </>)}
                </div>
              </div>
            </>
          ) : null}
        </header>

        <main className="mt-8 md:mt-12 lg:mt-16 px-8 md:px-0">
          <div className="block flex flex-col items-center">
            <h1 className="text-primary-500">Welcome&nbsp;👋</h1>
            <h2 className="mt-4">Know<span className="text-primary-500">ii</span> is a place for your community's
              Knowledge,
              Ideas and Inspiration.</h2>
          </div>

          <div className="mt-16 flex flex-row justify-center text-5xl font-bold">
            Coming soon...
          </div>
        </main>
        <footer className="">
        </footer>
      </div>
    </>
  );
}
