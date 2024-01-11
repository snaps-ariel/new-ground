const domainList: { [key: string]: string | undefined } = {
  SNAPS_WWW_KR: process.env.NEXT_PUBLIC_SNAPS_WWW_KR,
  SNAPS_MOBILE_KR: process.env.NEXT_PUBLIC_SNAPS_MOBILE_KR,
  OPM: process.env.NEXT_PUBLIC_API_URL,
};

export default domainList;
