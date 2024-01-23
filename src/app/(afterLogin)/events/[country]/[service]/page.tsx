import Events from '@/components/Events';
import { customFetcher } from '@/utils/fetcher';

export default async function EventPage() {
  // https://medium.com/designly/next-js-14-data-fetching-paradigms-client-vs-server-b42453d82f26

  const data = await customFetcher(
    '/v1/event/?offset=0&eventStatus=GOING&limit=9999',
    {
      method: 'GET',
      baseURL: process.env.NEXT_PUBLIC_API_STG1_URL,
    },
  );

  return <Events eventData={data} />;
}
