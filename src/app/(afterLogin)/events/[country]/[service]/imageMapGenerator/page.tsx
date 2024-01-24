import ImageMapGenerator from '@/components/Events/ImageMapGenerator';
import { customFetcher } from '@/utils/fetcher';

type Props = {
  params: {
    country: 'kor' | 'jpn';
    service: 'snaps' | 'opm';
  };
  searchParams: {
    idx: string;
  };
};
export default async function EventCreatePage({ params, searchParams }: Props) {
  const { country, service } = params;
  const { idx } = searchParams;

  // const getBannerData = await customFetcher(
  //   '/desktop/kor/eventBanners/web.json?idx=1904',
  //   {
  //     method: 'GET',
  //     baseURL: process.env.NEXT_PUBLIC_SNAPS_KR_S3,
  //   },
  // );
  // const getDetailData = data?.find(
  //   (el: IEventList) => el.idx === parseInt(idx),
  // );

  const isSnaps = service === 'snaps';
  const url = isSnaps
    ? `/desktop/${country}/map_event/${idx}/pc/e_body/eventBody-${idx}.json`
    : `/map_event/${idx}/pc/e_body/eventBody-${idx}.json`;
  const baseUrl = isSnaps
    ? process.env.NEXT_PUBLIC_SNAPS_KR_S3
    : process.env.NEXT_PUBLIC_OPM_KR_S3;

  const getMapJson = await customFetcher(url, {
    method: 'GET',
    baseURL: baseUrl,
  });

  return <ImageMapGenerator getMapData={getMapJson.EVENT_BODY} />;
}
