'use client';
import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import useGetEventsQuery from '@/queries/useGetEventsQuery';

const columnDefs: ColDef[] = [
  {
    field: 'idx',
    headerName: '순번',
    width: 100,
    editable: false,
  },
  {
    field: 'title',
    headerName: '이벤트 명',
    width: 240,
    filter: true,
  },
  {
    field: 'description',
    headerName: '이벤트 설명',
    width: 360,
  },
  {
    field: 'startDate',
    headerName: '시작 날짜',
    width: 140,
  },
  {
    field: 'endDate',
    headerName: '종료 날짜',
    width: 140,
  },
];

const defaultColDef: ColDef = {
  width: 50,
  filter: 'agTextColumnFilter',
  resizable: true,
};

export default function Events() {
  const router = useRouter();
  const { country, service } = useParams();
  const { data } = useGetEventsQuery(`${service}_mobile_${country}`);

  const handleClickEvent = () => {
    router.push(`/events/create?service=${service}&country=${country}`);
  };

  const DataTable = useMemo(() => {
    return (
      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={data?.list}
        domLayout="autoHeight"
        onRowClicked={handleClickEvent}
        onGridSizeChanged={(e) => {
          e.api.sizeColumnsToFit();
        }}
        onFirstDataRendered={(e) => {
          e.api.sizeColumnsToFit();
        }}
      />
    );
  }, [data?.list]);

  return (
    <div className="w-full">
      <div className="ag-theme-alpine w-full" id="eventsGird">
        {DataTable}
      </div>
    </div>
  );
}
