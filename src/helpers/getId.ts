export const getId = (url: string) => {
  const urlArr = url.split('/').filter((el) => el);
  return urlArr.slice(-1).join('');
};
