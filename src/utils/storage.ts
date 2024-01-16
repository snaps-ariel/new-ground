import Cookies from 'js-cookie';

export const getUserToken = () => Cookies.get('OH_PRINT_ME_GROUND_USER_TOKEN');

export const getHeader = () => {
  const headers = new Headers();
  headers.append('X-SNAPS-CHANNEL', 'DA_WEB');
  headers.append('X-SNAPS-TOKEN', getUserToken() || 'X');
  headers.append('Content-Type', 'application/json; charset=UTF-8');

  return headers;
};
