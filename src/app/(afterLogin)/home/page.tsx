'use client';
import useSWR from 'swr';
import { customFetcher } from '@/utils/fetcher';

export default function Home() {
  const { data: events } = useSWR(`/v1/event`);

  return <div>Home</div>;
}
