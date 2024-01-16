'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import InputField from '@/common/fields/inputField';
import { required, validEmail } from '@/utils/validate';
import { ILoginUser } from '@/app/model/user';

export default function LoginForm({ login }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    control,
    reset,
  } = useForm<ILoginUser>({ mode: 'onChange' });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit: SubmitHandler<ILoginUser> = async (data) => {
    await login(data.email, data.password);
    reset();
  };

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
