import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { getHeader } from '@/utils/storage';

export async function getUser(url: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    method: 'GET',
    headers: getHeader(),
    mode: 'cors',
  });

  return await res.json();
}

export async function updateUser(url: string, { arg }: { arg: object }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    method: 'POST',
    headers: getHeader(),
    mode: 'cors',
    body: JSON.stringify(arg),
  });

  return await res.json();
}

export function useLogin() {
  return useSWRMutation(`v1/account/user/login`, updateUser);
}

export function useUser() {
  return useSWR('v1/account/user', getUser);
}
