import { ColDef } from 'ag-grid-community';

export const columnDefs: ColDef[] = [
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

export const defaultColDef: ColDef = {
  width: 50,
  filter: 'agTextColumnFilter',
  resizable: true,
};
