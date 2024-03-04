import ImageMapGenerator from '@/components/Events/ImageMapGenerator';
import { customFetcher } from '@/utils/fetcher';

type Props = {
  params: {
    country: 'kor' | 'jpn';
    service: 'snaps' | 'opm';
  };
  searchParams: {
    idx: string;
    device?: string;
  };
};
export default async function ImageMapGeneratorPage({
  params,
  searchParams,
}: Props) {
  const { country, service } = params;
  const { idx, device } = searchParams;
  const deviceParam = device || 'pc';

  const isSnaps = service === 'snaps';
  const url = isSnaps
    ? `/${
        deviceParam === 'mobile' ? 'mobile' : 'desktop'
      }/${country}/map_event/${idx}/${deviceParam}/e_body/eventBody-${idx}.json`
    : `/map_event/${idx}/${deviceParam}/e_body/eventBody-${idx}.json`;

  const baseUrl = isSnaps
    ? process.env.NEXT_PUBLIC_SNAPS_KR_S3
    : process.env.NEXT_PUBLIC_OPM_KR_S3;

  const getMapJson = await customFetcher(url, {
    method: 'GET',
    baseURL: baseUrl,
  });

  return <ImageMapGenerator getMapData={getMapJson.EVENT_BODY} />;
}
