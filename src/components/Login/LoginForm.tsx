'use client';

import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import { ILoginUser } from '@/model/user';
import { useLogin } from '@/api/login';
import Input from '@/form/Input';

import { required, validEmail } from '@/utils/validate';

export default function LoginForm() {
  const router = useRouter();
  const {
    data: loginData,
    trigger: login,
    isMutating: isMutatingLogin,
    error: loginError,
  } = useLogin();
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
    (values) => {
      return login({ loginId: values.loginId, password: values.password });
    },
    [login],
  );

  // 로그인 성공
  useEffect(() => {
    if (loginData) {
      const { token } = loginData;
      Cookies.set('OH_PRINT_ME_GROUND_USER_TOKEN', token, {
        expires: 3,
      });
      router.push('/home');
    }
  }, [loginData, router]);

  // 로그인 실패
  useEffect(() => {
    if (loginError) {
      return setErrorMessage('회원정보를 찾을 수 없습니다.');
    }
  }, [loginError]);

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
