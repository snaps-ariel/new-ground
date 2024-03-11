import useSWRMutation from 'swr/mutation';
import { customFetcher } from '@/utils/fetcher';
import useSWR from 'swr';

interface IUserInfo {
  loginId: string;
  password: string;
}

export const getUser = async (url: string) => {
  return await customFetcher(url);
};

export const fetchLogin = async (url: string, { arg }: { arg: IUserInfo }) => {
  const { loginId, password } = arg;

  return await customFetcher(url, {
    method: 'POST',
    body: { loginId, password },
  });
};

export const fetchLogout = async (url: string) => {
  return await customFetcher(url, {
    method: 'DELETE',
  });
};

export const useLogin = () => {
  return useSWRMutation('/v1/account/user/login', fetchLogin);
};

export const useLogout = () => {
  return useSWRMutation('/v1/account/user/logout', fetchLogout);
};

export const useUser = () => {
  return useSWR('/v1/account/user', getUser);
};
