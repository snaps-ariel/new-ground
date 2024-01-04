'use client';

import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import useSWRMutation from 'swr/mutation';
let headers = new Headers();
headers.append('X-SNAPS-CHANNEL', 'DA_WEB');
headers.append('X-SNAPS-TOKEN', 'X');
headers.append('Content-Type', 'application/json; charset=UTF-8');

const options = {
  method: 'GET',
  headers: headers,
  mode: 'cors',
};
export function useApiRequest(apiUrl: string) {
  const { data, error } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/${apiUrl}`],
    (url) => fetcher(url.toString(), options),
  );

  return {
    getData: data,
    isLoading: !error && !data,
    isError: error,
  };
}
function updateUser(url: string, params: object) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    method: 'POST',
    headers: headers,
    mode: 'cors',
    body: JSON.stringify(params),
  });
}
export function useMutateApiRequest(apiUrl: string, params: object) {
  // const { data, mutate } = useSWR(apiUrl, (url) =>
  //   updateUser(url.toString(), params),
  // );
  //
  // return {
  //   data,
  //   mutate: () => mutate(),
  // };
  return useSWRMutation(apiUrl, (url) => updateUser(url.toString(), params));
}
