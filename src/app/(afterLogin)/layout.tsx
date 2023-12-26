import '../globals.css';
import { Metadata } from 'next';
import SWRConfigContext from '@/context/SWRConfigContext';
import { Open_Sans } from 'next/font/google';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';

const openSans = Open_Sans({ subsets: ['latin'] });

const inter = Inter({ subsets: ['latin'] });

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
    <>
      <header className="sticky top-0 bg-black z-10 border-b">
        <div className="max-w-screen-xl mx-auto">navbar</div>
      </header>
      <main className="w-full flex justify-center max-w-screen-xl mx-auto">
        {children}
      </main>
    </>
  );
}
