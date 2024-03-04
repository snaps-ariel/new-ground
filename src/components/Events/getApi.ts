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

  if (country === 'kor') {
    if (service === 'snaps') {
      if (searchParams && searchParams.device === 'pc') {
        return {
          baseUrl: process.env.NEXT_PUBLIC_SNAPS_KR_PC_STG1_URL,
        };
      } else {
        return {
          baseUrl: process.env.NEXT_PUBLIC_SNAPS_KR_MOB_STG1_URL,
        };
      }
    }
    if (service === 'opm') {
      return {
        baseUrl: process.env.NEXT_PUBLIC_OPM_KR_STG1_URL,
      };
    }
  }
  if (country === 'jpn') {
    if (service === 'snaps') {
      if (searchParams && searchParams.device === 'pc') {
        return {
          baseUrl: process.env.NEXT_PUBLIC_SNAPS_JP_STG1_URL,
        };
      } else {
        return {
          baseUrl: process.env.NEXT_PUBLIC_SNAPS_JP_MOB_STG1_URL,
        };
      }
    }
    if (service === 'opm') {
      return {
        baseUrl: process.env.NEXT_PUBLIC_OPM_JP_STG1_URL,
      };
    }
  }

  return {
    baseUrl: process.env.NEXT_PUBLIC_SNAPS_KR_PC_STG1_URL,
  };
};
