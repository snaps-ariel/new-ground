'use client';

import { useParams, useSearchParams } from 'next/navigation';

interface IGetParams {
  country: string;
  service: string;
  device?: string;
  pageParam?: string;
  idx?: number;
}

export const useGetParams = () => {
  const { country, service } = useParams();
  const searchParams = useSearchParams();
  const deviceParam = searchParams.get('device');
  const idxParam = searchParams.get('idx');
  const pageParam = searchParams.get('page');

  return {
    country,
    service,
    device: deviceParam || 'pc',
    page: pageParam || '1',
    idx: idxParam || '',
  };
};
