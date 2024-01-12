import '../globals.css';
import SWRConfigContext from '@/context/SWRConfigContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative w-full h-full">
      <SWRConfigContext>{children}</SWRConfigContext>
    </main>
  );
}
