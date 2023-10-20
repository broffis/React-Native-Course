export const getFormattedDate = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const getDateMinusDays = (date: Date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
