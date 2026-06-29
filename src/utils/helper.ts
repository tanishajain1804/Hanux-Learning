// Utility helper functions
export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const formatPercent = (value: number) => {
  return `${value}%`;
};
