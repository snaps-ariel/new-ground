import './globals.css';
import { Metadata } from 'next';
import SWRConfigContext from '@/context/SWRConfigContext';
import { Open_Sans } from 'next/font/google';
import { useRouter } from 'next/router';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'GrounD | Webling',
    template: 'GrounD | %s',
  },
  description: 'GrounD for Webling',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="w-full bg-neutral-50 overflow-auto">
        {/*<header className="sticky top-0 bg-black z-10 border-b">*/}
        {/*  <div className="max-w-screen-xl mx-auto">navbar</div>*/}
        {/*</header>*/}
        {/*<main className="w-full flex justify-center max-w-screen-xl mx-auto">*/}
        <main className="relative w-full h-full">
          <SWRConfigContext>{children}</SWRConfigContext>
        </main>
      </body>
    </html>
  );
}
