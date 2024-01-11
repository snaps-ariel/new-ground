import useSWR from 'swr';

import { fetcher } from '@/utils/fetcher';
import { setFetchOptions } from '@/utils/setHeader';
import { IEvents } from '@/types/event';
import domainList from '@/constants/domainList';

const fetchEvents = async (domain: string) => {
  const options = setFetchOptions(domain, 'GET');

  let api = '/v1/event/';

  if (domain.includes('snaps')) {
    api += `?offset=0&eventStatus=GOING&limit=9999`;
  }

  const formattedDomain = domainList[domain.toUpperCase()];

  return await fetcher(`${formattedDomain}/${api}`, options);
};

const useGetEventsQuery = (domain: string) =>
  useSWR<IEvents, Error>(['events', domain], () => fetchEvents(domain), {
    onError: (error) => {
      console.error(`getEventsError : ${error}`);
    },
  });

export default useGetEventsQuery;
