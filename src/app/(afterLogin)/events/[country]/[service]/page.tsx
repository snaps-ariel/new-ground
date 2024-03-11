import Events from '@/components/Events';
import { customFetcher } from '@/utils/fetcher';
import { getApi } from '@/components/Events/getApi';

type Props = {
  params: {
    country: 'kor' | 'jpn';
    service: 'snaps' | 'opm';
  };
  searchParams: {
    device: string;
  };
};
export default async function EventPage({ params, searchParams }: Props) {
  // https://medium.com/designly/next-js-14-data-fetching-paradigms-client-vs-server-b42453d82f26
  const { country, service } = params;
  const { baseUrl } = getApi(params, searchParams);

  const data = await customFetcher(
    '/v1/event/?offset=0&eventStatus=GOING&limit=9999',
    {
      method: 'GET',
      baseURL: baseUrl,
      ...(service === 'opm' && { headers: { 'X-OHPRINT-CHANNEL': 'DA_WEB' } }),
    },
  );

  return <Events eventData={data} />;
}
