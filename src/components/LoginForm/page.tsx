'use client';

import InputField from '@/common/fields/inputField';
import { required, validEmail } from '@/utils/validate';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useApiRequest, useMutateApiRequest } from '@/hooks/useApiRequest';
import { useEffect, useState } from 'react';
import axiosClient from '@/utils/axios';
import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from '@/utils/fetcher';
import { useLogin } from '@/api/login';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

type Inputs = {
  loginId: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    control,
  } = useForm<Inputs>({ mode: 'onBlur' });

  const {
    data: loginData,
    error: loginError,
    isMutating,
    trigger: login,
    reset,
  } = useLogin();

  console.log(loginData);

  // const api = 'v1/hello';
  // const { trigger } = useMutateApiRequest(
  //   'v1/account/user/login',
  //   loginUserInfo,
  // );

  // const result = useApiRequest('v1/hello');

  const onSubmit: SubmitHandler<Inputs> = (values) => {
    login({ loginId: values.loginId, password: values.password });
    return;
  };

  useEffect(() => {
    if (!loginData) return;

    const { token } = loginData;
    Cookies.set('OH_PRINT_ME_GROUND_USER_TOKEN', token, {
      expires: 3,
      path: '/',
    });
    router.push('/home');
  }, [loginData]);

  useEffect(() => {
    if (!loginError) return;
    console.log(loginError.message);
  }, [loginError]);

  const errorMessage = true;
  const isValid =
    !!watch('loginId') && !!watch('password') && Object.keys(errors).length < 1;

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        name={'loginId'}
        placeholder={'이메일'}
        register={register('loginId', {
          required: required,
          pattern: validEmail,
        })}
        errors={errors}
        control={control}
      />

      <InputField
        name={'password'}
        type={'password'}
        placeholder={'비밀번호'}
        register={register('password', {
          required: required,
        })}
        errors={errors}
        control={control}
      />

      {/*{errorMessage && (*/}
      {/*  // <span className="error">{errorMessage}</span>*/}
      {/*  <span className="text-[#f02222] text-[12px] leading-[34px]">*/}
      {/*    회원정보를 찾을 수 없습니다.*/}
      {/*  </span>*/}
      {/*)}*/}

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
