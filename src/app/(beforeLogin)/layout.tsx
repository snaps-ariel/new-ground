import '../globals.css';
import { Metadata } from 'next';
import SWRConfigContext from '@/context/SWRConfigContext';
import { Open_Sans } from 'next/font/google';

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
        <main className="relative w-full h-full">
          <SWRConfigContext>{children}</SWRConfigContext>
        </main>
      </body>
    </html>
  );
}
