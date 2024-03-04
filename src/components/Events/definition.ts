import { TableProps } from 'antd';
import { IEventList } from '@/model/events';

export const columns: TableProps<IEventList>['columns'] = [
  {
    title: '순번',
    dataIndex: 'idx',
    key: 'idx',
  },
  {
    title: '이벤트 명',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '이벤트 설명',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '시작 날짜',
    dataIndex: 'startDate',
    key: 'startDate',
  },
  {
    title: '종료 날짜',
    dataIndex: 'endDate',
    key: 'endDate',
  },
];

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

export const boxStyle = {
  backgroundColor: 'rgba(169, 169, 169, 0.5)',
  border: '1px solid rgba(255, 0, 0, 0.5)',
};
export const boxSpanStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(255, 255, 0, 0.5)',
  height: '100%',
  fontSize: '20px',
};
