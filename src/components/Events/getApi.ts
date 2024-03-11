type Params = {
  country: 'kor' | 'jpn';
  service: 'snaps' | 'opm';
};
type SearchParams = {
  idx?: string;
  device?: string;
};
export const getApi = (params: Params, searchParams: SearchParams) => {
  const { country, service } = params;
  const isPcDevice =
    Object.keys(searchParams).length < 1 || searchParams?.device === 'pc';

  if (country === 'kor' && service === 'snaps') {
    if (isPcDevice) {
      return {
        baseUrl: process.env.NEXT_PUBLIC_SNAPS_KR_PC_STG1_URL,
      };
    } else {
      return {
        baseUrl: process.env.NEXT_PUBLIC_SNAPS_KR_MOB_STG1_URL,
      };
    }
  }

  if (country === 'kor' && service === 'opm') {
    return {
      baseUrl: process.env.NEXT_PUBLIC_OPM_KR_STG1_URL,
    };
  }

  if (country === 'jpn' && service === 'snaps') {
    if (isPcDevice) {
      return {
        baseUrl: process.env.NEXT_PUBLIC_SNAPS_JP_STG1_URL,
      };
    } else {
      return {
        baseUrl: process.env.NEXT_PUBLIC_SNAPS_JP_MOB_STG1_URL,
      };
    }
  }

  if (country === 'jpn' && service === 'opm') {
    return {
      baseUrl: process.env.NEXT_PUBLIC_OPM_JP_STG1_URL,
    };
  }

  return {
    baseUrl: process.env.NEXT_PUBLIC_SNAPS_KR_PC_STG1_URL,
  };
};
