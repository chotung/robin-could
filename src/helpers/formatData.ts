import moment from "moment";
// import { Stock, Trade } from "../reducers/stocks/types";
import {
  // TwelveDataStockTimeSeries,
  TimeSeries,
} from "../reducers/stocks/types";
import {
  NewStockDataRequestParameters,
  FormattedData,
  PolygonStock,
  StockAtTime,
  StockObjectInAggregatedWindow,
} from "./types";
import { setInterval } from "../reducers/stocks/StockSlice";

export const formatData = (
  stock: NewStockDataRequestParameters,
  api: string,
  range?: string,
  live?: boolean
): FormattedData => {
  if (api === "twelveData") {
    const open = stock.values.map((timeSeries: TimeSeries) => {
      return timeSeries.open;
    });
    const time = stock.values.map((timeSeries: TimeSeries) => {
      const time = moment(timeSeries.datetime);
      return time;
    });
    return { open, time };
  } else {
    formatPolygonData(stock, range, live);
  }
  return { open: [], time: [] };
};

const formatPolygonData = (
  stock: PolygonStock,
  range?: string,
  live?: boolean
) => {
  if (stock.status === "" && stock.results.length === 0) {
    return { open: [], price: [] };
  }
  if (live) {
    return { open: [], time: [] };
  }
  // const open: number[] = [];
  // const time: number[] = [];
  // stock.forEach((s: any) => {
  //   open.push(s.p);
  //   time.push(s.t);
  // });
  // return { open, time };
  // } else {
  const formattedStock = stock.results.map((stockObj: StockAtTime) => {
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
  formattedStock.sort(
    (a: StockObjectInAggregatedWindow, b: StockObjectInAggregatedWindow) => {
      console.log(a, b);
      return moment(a.time).valueOf() - moment(b.time).valueOf();
      // return a.time - b.time;
    }
  );
  let removeInvalidTimes;
  if (range === "1D" || range === "5D") {
    removeInvalidTimes = formattedStock.filter(
      (stock: StockObjectInAggregatedWindow) => {
        const startingPeriod = parseInt(
          moment(stock.time).startOf("hour").format("h")
        );
        const amPm = moment(stock.time).format("a");
        if (startingPeriod >= 6) {
          return stock;
        } else if (startingPeriod < 6 && amPm.toLowerCase() === "pm") {
          return stock;
        }
      }
    );
  }
  // rename the variables
  const openPriceArr =
    range === "1D" || range === "5D"
      ? removeInvalidTimes?.map((s: StockObjectInAggregatedWindow) => s.open)
      : formattedStock.map((s: StockObjectInAggregatedWindow) => s.open);
  // format time
  const timeArr =
    range === "1D" || range === "5D"
      ? removeInvalidTimes?.map((t: StockObjectInAggregatedWindow) => t.time)
      : formattedStock.map((t: StockObjectInAggregatedWindow) => t.time);

  return { open: openPriceArr, time: timeArr };
  // }
};

export const adjustRange = (
  interval: string,
  outputSize: string,
  dispatch: any,
  twelveDataTimeSeries: any,
  twelveDataQuote: any,
  stock: string
): void => {
  const stockObjectOptions: StockObjectOptions = {
    searchSymbol: "AAPL",
  };
  stockObjectOptions.searchSymbol = stock;
  stockObjectOptions.interval = interval;
  stockObjectOptions.outputSize = outputSize;
  dispatch(setInterval(interval));
  dispatch(
    twelveDataTimeSeries(stockObjectOptions, stockObjectOptions.searchSymbol)
  );
  dispatch(
    twelveDataQuote(stockObjectOptions, stockObjectOptions.searchSymbol)
  );
};

type StockObjectOptions = {
  searchSymbol: string;
  interval?: string;
  outputSize?: string;
};
