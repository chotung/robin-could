import moment from "moment";

export const formatData = (stock: any, range: string) => {
  const formattedStock = stock.results.map((stockObj: any) => {
    const { o, c, h, l, v, vw, t, n } = stockObj;
    const time = moment(t);
    const stockObjectInAggregatedWindow = {
      time,
      open: o,
      close: c,
      highest: h,
      lowest: l,
      volume: v,
      volumeWeightedAvgPrice: vw,
      numberOfTransactionInRange: n,
    };
    return stockObjectInAggregatedWindow;
  });
  formattedStock.sort((a: any, b: any) => {
    return a.time - b.time;
  });
  let removeInvalidTimes;
  if (range === "1D") {
    removeInvalidTimes = formattedStock.filter((stock: any) => {
      const startingPeriod = parseInt(
        moment(stock.time).startOf("hour").format("h")
      );
      const amPm = moment(stock.time).format("a");
      if (startingPeriod >= 6) {
        return stock;
      } else if (startingPeriod < 6 && amPm.toLowerCase() === "pm") {
        return stock;
      }
    });
  }
  // rename the variables
  const openPriceArr =
    range === "1D"
      ? removeInvalidTimes.map((s: any) => s.open)
      : formattedStock.map((s: any) => s.open);
  // format time
  const timeArr =
    range === "1D"
      ? removeInvalidTimes.map((t: any) => t.time)
      : formattedStock.map((t: any) => t.time);

  return { open: openPriceArr, time: timeArr };
};

export const adjustRange = (
  multiplier: number,
  timeSpan: string,
  fromDate: string,
  toDate: string,
  range: string,
  dispatch: any,
  setRange: any,
  getStockInAggragateRange: any,
	stock: any
) => {
  const stockObjectOptions: any = {
    searchStock: "AAPL",
  };
	stockObjectOptions.searchStock = stock
  stockObjectOptions.multiplier = multiplier;
  stockObjectOptions.timeSpan = timeSpan;
  stockObjectOptions.fromDate = fromDate;
  stockObjectOptions.toDate = toDate;
  dispatch(setRange(range));
  dispatch(getStockInAggragateRange(stockObjectOptions, stockObjectOptions.searchStock));
};