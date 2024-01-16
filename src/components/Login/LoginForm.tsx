'use client';

import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import { required, validEmail } from '@/utils/validate';
import { useLogin } from '@/hooks/useUsers';
import { ILoginUser } from '@/app/model/user';
import Input from '@/form/Input';

export default function LoginForm() {
  const router = useRouter();
  const { trigger: triggerLogin, isMutating: isMutatingLogin } = useLogin();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    control,
  } = useForm<ILoginUser>({ mode: 'onChange' });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit: SubmitHandler<ILoginUser> = useCallback(
    async (values) => {
      try {
        const userInfoRes = await triggerLogin({
          loginId: values.loginId,
          password: values.password,
        });

        if (userInfoRes.token) {
          Cookies.set('OH_PRINT_ME_GROUND_USER_TOKEN', userInfoRes.token, {
            expires: 3,
            path: '/',
          });
          return router.push('/home');
        } else {
          return setErrorMessage(userInfoRes.errorMessage);
        }
      } catch (err) {
        console.log('err', err);
      }
    },
    [triggerLogin, router],
  );

  const isValid =
    !!watch('loginId') && !!watch('password') && Object.keys(errors).length < 1;

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Input
        name={'loginId'}
        placeholder={'이메일'}
        register={register('loginId', {
          required: required,
          pattern: validEmail,
        })}
        errors={errors}
        control={control}
        disabled={isMutatingLogin}
      />

      <Input
        name={'password'}
        type={'password'}
        placeholder={'비밀번호'}
        register={register('password', {
          required: required,
        })}
        errors={errors}
        control={control}
        disabled={isMutatingLogin}
      />

      {!!errorMessage && (
        <span className="text-[#f02222] text-[12px] leading-[34px]">
          {errorMessage}
        </span>
      )}

      <button
        className={`w-full mt-[80px] text-[#fff] text-[12px] h-[50px] ${
          isValid
            ? 'bg-[#2c83e9] border-[#2c83e9]'
            : 'bg-[#c7cdd3] border-[#c7cdd3]'
        }`}
        disabled={!isValid}
        type="submit"
      >
        로그인
      </button>
    </form>
  );
}
