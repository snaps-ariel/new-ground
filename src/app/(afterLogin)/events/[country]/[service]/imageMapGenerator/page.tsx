import EventGenerator from '@/components/Events/ImageMapGenerator';
import { customFetcher } from '@/utils/fetcher';
import { IEventList } from '@/model/events';

type Props = {
  params: {
    country: 'ko' | 'jp';
    service: 'snaps' | 'ohprintme';
  };
  searchParams: {
    idx: string;
  };
};
export default async function EventCreatePage({ params, searchParams }: Props) {
  const { country, service } = params;
  const { idx } = searchParams;

  // 요청은 두개 필요: 배너 / 이벤트 맵 json

  const data = await customFetcher(
    '/desktop/kor/eventBanners/web.json?idx=1904',
    {
      method: 'GET',
      baseURL: process.env.NEXT_PUBLIC_SNAPS_KR_S3,
    },
  );

  const mapRes = await customFetcher(
    '/desktop/kor/map_event/1904/pc/e_body/eventBody-1904.json',
    {
      method: 'GET',
      baseURL: process.env.NEXT_PUBLIC_SNAPS_KR_S3,
    },
  );

  const getDetailData = data?.find(
    (el: IEventList) => el.idx === parseInt(idx),
  );
  const mapArea = mapRes.EVENT_BODY;

  return (
    <EventGenerator eventCreateData={getDetailData} getMapData={mapArea} />
  );
}
