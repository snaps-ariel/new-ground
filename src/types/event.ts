export interface IEvents {
  list: EventModel[];
}

interface EventModel {
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
