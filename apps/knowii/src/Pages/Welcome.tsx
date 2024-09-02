import {Head} from '@inertiajs/react';
import {PageProps} from '@/types';
import Hello from "@/Components/hello";
import { foo } from "@knowii/common";

export default function Welcome({laravelVersion, phpVersion}: PageProps<{
  laravelVersion: string,
  phpVersion: string
}>) {
  return (
    <>
      <Head title="Welcome"/>
      <header>
        Header
      </header>

      {/*{auth.user ? (*/}
        {/*  <Link*/}
        {/*    href={route('dashboard')}*/}
        {/*    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"*/}
        {/*  >*/}
        {/*    Dashboard*/}
        {/*  </Link>*/}
        {/*) : (*/}
        {/*  <>*/}
        {/*    <Link*/}
        {/*      href={route('login')}*/}
        {/*      className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"*/}
        {/*    >*/}
        {/*      Log in*/}
        {/*    </Link>*/}
        {/*    <Link*/}
        {/*      href={route('register')}*/}
        {/*      className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"*/}
        {/*    >*/}
        {/*      Register*/}
        {/*    </Link>*/}
        {/*  </>*/}
        {/*)}*/}

      <main className="mt-6">
        Hello world {foo}

        <Hello />



      </main>

      <footer className="py-16 text-center text-sm text-black dark:text-white/70">
        Laravel v{laravelVersion} (PHP v{phpVersion})
      </footer>
    </>
  )
    ;
}
