'use client';

import { SWRConfig } from 'swr';
import { fetcher } from '@/utils/fetcher';

type Props = {
  children: React.ReactNode;
};

export default function SWRConfigContext({ children }: Props) {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
}
