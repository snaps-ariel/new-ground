import axiosClient from '@/utils/axios';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { customFetcher } from '@/utils/fetcher';

interface IUserInfo {
  loginId: string;
  password: string;
}
export const fetchLogin = async (url: string, { arg }: { arg: IUserInfo }) => {
  const { loginId, password } = arg;
  const data = await customFetcher(url, {
    method: 'POST',
    body: { loginId, password },
  });

  return data;
};

export const useLogin = () => {
  return useSWRMutation('/v1/account/user/login', fetchLogin);
};
