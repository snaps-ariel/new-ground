import LoginForm from '@/components/Login/LoginForm';
import Logo from '@/components/common/Logo';

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <section className="w-[360px]">
        <Logo />
        <LoginForm />
      </section>
    </div>
  );
}
