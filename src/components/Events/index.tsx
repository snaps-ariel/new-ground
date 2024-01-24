'use client';

import { useParams, useRouter } from 'next/navigation';
import { AgGridReact } from 'ag-grid-react';

import { IEventList } from '@/model/events';
import { columnDefs, defaultColDef } from '@/components/Events/definition';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

type Props = {
  eventData: {
    list: IEventList[];
    totalCount: number;
  };
};

export default function Events({ eventData }: Props) {
  const router = useRouter();
  const { country, service } = useParams();

  const handleClickEvent = (events: { data: { idx: number } }) => {
    const { idx } = events?.data;
    router.push(`/events/${country}/${service}/imageMapGenerator?idx=${idx}`);
  };

  return (
    <div className="w-full">
      <div className="ag-theme-alpine w-full" id="eventsGird">
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowData={eventData?.list}
          domLayout="autoHeight"
          onRowClicked={handleClickEvent}
        />
      </div>
    </div>
  );
}
