'use client';

import { SWRConfig } from 'swr';
import { customFetcher } from '@/utils/fetcher';

type Props = {
  children: React.ReactNode;
};

export default function SWRConfigContext({ children }: Props) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (url: string) => customFetcher(url),
      }}
    >
      {children}
    </SWRConfig>
  );
}
