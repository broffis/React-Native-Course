export const getFormattedDate = (date: Date): string => {
  return date.toISOString().slice(0, 10);
};

export const getDateMinusDays = (date: Date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
