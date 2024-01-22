import Image from 'next/image';

import Logo from '../../../public/dev-admin-logo.svg';
import LoginForm from '@/components/Login/LoginForm';

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <section className="w-[360px]">
        <Image
          src={Logo}
          alt={'logo'}
          priority={true}
          style={{ paddingBottom: '60px', margin: '0 auto' }}
        />
        <LoginForm />
      </section>
    </div>
  );
}
