import '../globals.css';
import { Open_Sans } from 'next/font/google';

import SWRConfigContext from '@/context/SWRConfigContext';
import Sidebar from '@/components/Sidebar';

const openSans = Open_Sans({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SWRConfigContext>
        <Sidebar />
        <main className="w-full flex justify-center max-w-screen-xl mx-auto">
          {children}
        </main>
      </SWRConfigContext>
    </>
  );
}
