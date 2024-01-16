import './globals.css';
import { Metadata } from 'next';
import SWRConfigContext from '@/context/SWRConfigContext';
import { Open_Sans } from 'next/font/google';
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
    <html lang="en" className={openSans.className}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
