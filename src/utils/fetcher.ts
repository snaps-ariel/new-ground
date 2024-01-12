import axios from 'axios';

const getOptions = (token: string) => {
  return {};
};

export const fetcher = (url: string, token: string = '', params = {}) => {
  if (!!token) {
    return axios
      .get(url, {
        method: 'GET',
        headers: {
          'X-SNAPS-CHANNEL': 'DA_WEB',
          'X-SNAPS-TOKEN': token,
        },
      })
      .then((res) => {
        return res.data;
      });
  }
};
