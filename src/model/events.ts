export interface IEventList {
  idx: number;
  eventCode: null;
  title: string;
  description: string;
  content: string;
  contentType: string;
  footer: null;
  startDate: string;
  endDate: string;
  dueDate: string;
  filePath: string;
  allowChannel: null;
  registrationDate: string;
  lotteryYN: string;
  shareUrl: null;
  serverDate: null;
  isLink: boolean;
  linkUrl: null;
  friendCode: null;
  replyYn: null;
  autoRegYN: null;
  couponDurDay: null;
  deviceCheckYN: null;
  eventTargetChannel: null;
  list: null;
  couponList: null;
  link: false;
}

export interface IBannerData {
  btnText: string;
  des: string | null;
  idx: number;
  image: string | null;
  isBtn: boolean;
  isShowNotLoggedInOnly: string;
  isSwitch: boolean;
  style: {
    backgroundImage: string;
    button: string | null;
    divBox: string | null;
    img: string | null;
    p: string | null;
  };
  title: string | null;
  titleImage: string | null;
  type: string;
}

export interface IMapArea {
  desc: object;
  height: string;
  key: string;
  left: string;
  top: string;
  type: string;
  width: string;
}
