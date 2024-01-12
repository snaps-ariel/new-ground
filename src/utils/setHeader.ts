export const setFetchOptions = (domain: string, method: string) => {
  let headers = new Headers();

  if (domain.includes('snaps')) {
    headers.append('X-SNAPS-CHANNEL', 'DA_WEB');
    headers.append('X-SNAPS-TOKEN', 'X');
    headers.append('Content-Type', 'application/json; charset=UTF-8');
  }

  return {
    method,
    headers,
    mode: 'cors',
  };
};
