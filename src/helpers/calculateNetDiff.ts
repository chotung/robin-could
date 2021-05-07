export const calculateNetDiff = (
  price: number,
  previousPrice: number
): string => {
  return (((price - previousPrice) / previousPrice) * 100).toFixed(2);
};
