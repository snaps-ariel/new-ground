'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function HomePage() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedIn = true;

  useEffect(() => {
    if (!isLoggedIn) {
      return redirect('/login');
    } else {
      return redirect('/home');
    }
  }, [isLoggedIn]);

  return null;
}
