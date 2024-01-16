export const breakLines = (value: string) =>
  (value || '').replace(/(\r\n|\n|\r)/gm, '<br/>');
