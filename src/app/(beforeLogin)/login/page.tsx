'use client';
import useApiRequest from '@/hooks/useApiRequest';
import useSWR from 'swr';

export default function Login() {
  // const { data, mutate } = useSWR(
  //   `${process.env.NEXT_PUBLIC_API_URL}/account/user/login`,
  // );
  let headers = new Headers();
  headers.append('X-SNAPS-CHANNEL', 'DA_WEB');
  headers.append('X-SNAPS-TOKEN', 'X');
  headers.append('Content-Type', 'application/json; charset=UTF-8');
  const onSubmit = async () => {
    // e.preventDefault();
    // const res = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/v1/account/user/login`,
    //   {
    //     method: 'POST',
    //     headers: headers,
    //     mode: 'cors',
    //     body: JSON.stringify({
    //       loginId: 'odin@snaps.com',
    //       password: '1234',
    //     }),
    //   },
    // );
    // console.log('res', res);
    // console.log('data', data);
    // console.log('mutate', mutate);
  };

  return (
    <div className="table w-full h-full text-center">
      <div className="table-cell">
        <div className="flex justify-center items-center h-full">
          {/*<form onSubmit={handleSubmit(this.onSubmit)}>*/}
          <form className="flex flex-col" onSubmit={onSubmit}>
            <span />
            <input
              name="loginId"
              placeholder="이메일"
              // component={InputField}
              // validate={[ Validate.required, Validate.email ]}/>
            />

            <input
              name="password"
              // type="password"
              placeholder="비밀번호"
              // component={InputField}
              // validate={[ Validate.required ]}
            />

            {/*{errorMessage && (*/}
            {/*  <span className="error">{errorMessage}</span>*/}
            {/*)}*/}

            <button
              className="w-full mt-80px"
              // disabled={!valid || submitting}
              // type="submit"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
