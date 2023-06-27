export const differentTime = (postedOn) => {
  const currentTime = new Date().getTime();
  const postedTime = new Date(postedOn).getTime();
  const difference = currentTime - postedTime;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  return days;
};
