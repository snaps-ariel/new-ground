'use client';

import { useCallback } from 'react';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { Select, Space } from 'antd';
import { Table } from 'antd';

import { IEventList } from '@/model/events';
import { columns } from '@/components/Events/definition';
import { useGetParams } from '@/hooks/useGetParams';

type Props = {
  eventData: {
    list: IEventList[];
    totalCount: number;
  };
};

export default function Events({ eventData }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { country, service, device, page } = useGetParams();

  const countrySelectOptions = [
    { value: 'kor', label: 'KR' },
    { value: 'jpn', label: 'JP' },
  ];
  const deviceSelectOptions = [
    { value: 'pc', label: 'PC' },
    { value: 'mobile', label: 'MOBILE' },
  ];

  const handleClickEvent = (record: IEventList) => {
    const { idx } = record;
    router.push(
      `/events/${country}/${service}/imageMapGenerator?device=${device}&idx=${idx}`,
    );
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleChange = (value: string) => {
    const isSelectCountry = value === 'kor' || value === 'jpn';
    const isSelectDevice = value === 'pc' || value === 'mobile';
    if (isSelectCountry) {
      router.push(`/events/${value}/${service}?device=${device}`);
    }
    if (isSelectDevice) {
      router.push(`?${createQueryString('device', value)}`);
    }
  };

  const onChangePagination = (page: number) => {
    router.push(`?${createQueryString('page', page.toString())}`);
  };

  return (
    <div className="w-full">
      <div className="ag-theme-alpine w-full" id="eventsGird">
        <article className="flex flex-col justify-center h-40">
          <h1 className="text-4xl w-full border-double border-b-[2px] border-b-gray-400 pb-[10px]">
            {`${service.toString().toUpperCase()}-${countrySelectOptions.find(
              (option) => option.value === country,
            )?.label}-${deviceSelectOptions.find(
              (option) => option.value === (device || 'pc'),
            )?.label}`}
          </h1>
          <Space style={{ margin: '10px 0' }}>
            <Select
              value={
                countrySelectOptions.find((option) => option.value === country)
                  ?.label
              }
              style={{ width: 120 }}
              onChange={handleChange}
              options={countrySelectOptions}
            />
            <Select
              value={
                deviceSelectOptions.find((option) => option.value === device)
                  ?.label
              }
              style={{ width: 120 }}
              onChange={handleChange}
              options={deviceSelectOptions}
            />
          </Space>
        </article>
        <Table
          columns={columns}
          dataSource={eventData?.list}
          pagination={{
            current: parseInt(page),
            pageSize: 20,
            onChange: onChangePagination,
          }}
          size={'middle'}
          onRow={(record) => {
            return {
              onClick: () => handleClickEvent(record),
              style: { cursor: 'pointer' },
            };
          }}
        />
      </div>
    </div>
  );
}
