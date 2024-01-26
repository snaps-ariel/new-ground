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

export const SNAPS_EVENT_TYPE = [
  { label: '내부 링크', value: 'goLink' },
  { label: '쿠폰 받기', value: 'getCoupon' },
  { label: '레이어 팝업', value: 'openLayerPopup' },
  { label: '외부 링크 (팝업)', value: 'goOutLink' },
  { label: '카카오톡 채널추가', value: 'goKakaoChannel' },
  { label: '카카오톡 공유하기', value: 'shareKakao' },
  { label: '텍스트 복사', value: 'copyText' },
  { label: 'gif 추가', value: 'setGif' },
  { label: '커스텀 함수 매핑', value: 'setCustomFunction' },
  { label: '유튜브 재생', value: 'embedYoutube' },
];

export const OPM_EVENT_TYPE = [
  { label: '내부 링크', value: 'goLink' },
  { label: '쿠폰 받기', value: 'getCoupons' },
  { label: '레이어 팝업', value: 'openLayerPopup' },
  { label: '외부 링크 (팝업)', value: 'goOutLink' },
  { label: '카카오톡 채널추가', value: 'goKakaoChannel' },
  { label: '쿠폰 발급 후 이동', value: 'getCouponsMove' },
  { label: '텍스트 복사', value: 'copyText' },
  { label: 'gif 추가', value: 'setGif' },
  { label: '커스텀 함수 매핑', value: 'setCustomFunction' },
];
