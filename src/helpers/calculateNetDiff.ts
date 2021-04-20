export const calculateNetDiff = (price: number, previousPrice: number) => {
  return (((price - previousPrice) / previousPrice) * 100).toFixed(2);
};
