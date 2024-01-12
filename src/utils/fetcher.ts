export const fetcher = (
  url: string,
  options?: { method: string; headers: Headers; mode: string } | {},
) => {
  return fetch(url, options ?? {}).then((res) => res.json());
};
