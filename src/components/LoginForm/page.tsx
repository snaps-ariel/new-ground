'use client';

import InputField from '@/common/fields/inputField';
import { required, validEmail } from '@/utils/validate';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useApiRequest, useMutateApiRequest } from '@/hooks/useApiRequest';
import { useState } from 'react';

type Inputs = {
  loginId?: string;
  password?: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    control,
  } = useForm<Inputs>({ mode: 'onBlur' });

  const [loginUserInfo, setLoginUserInfo] = useState<Inputs>({});

  const api = 'v1/hello';
  const { trigger } = useMutateApiRequest(
    'v1/account/user/login',
    loginUserInfo,
  );

  const result = useApiRequest('v1/hello');
  const onSubmit: SubmitHandler<Inputs> = (values) => {
    // setLoginUserInfo({
    //   loginId: values.loginId,
    //   password: values.password,
    // });
    // e.preventDefault();
    // trigger();
    // setError(
    //   'loginId', // 에러 핸들링할 input요소 name
    //   { message: '비밀번호가 일치하지 않습니다.' }, // 에러 메세지
    //   { shouldFocus: true }, // 에러가 발생한 input으로 focus 이동
    // );
    console.log('submit values', values);
    return;
  };

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
