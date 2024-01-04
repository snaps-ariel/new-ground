import LoginForm from '@/components/LoginForm/page';
import Logo from '../../../../public/dev-admin-logo.svg';
import Image from 'next/image';

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <section className="w-[360px]">
        <Image
          src={Logo}
          alt={'logo'}
          style={{ paddingBottom: '60px', margin: '0 auto' }}
        />
        <LoginForm />
      </section>
    </div>
  );
}
