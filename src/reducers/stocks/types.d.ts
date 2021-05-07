// TWELVEDATA API

interface TwelveDataStockTimeSeries {
  meta: MetaData;
  values: TimeSeries[];
  status: string;
}

interface TwelveDataStockQuote {
  interval: string;
  symbol: string;
  name: string;
  exchange: string;
  currency: string;
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  previous_close: string;
  change: string;
  percent_change: string;
  average_volume: string;
  fifty_two_week: FiftyTwoWeek;
}

type FiftyTwoWeek = {
  low: string;
  high: string;
  low_change: string;
  high_change: string;
  low_change_percent: string;
  high_change_percent: string;
  range: string;
};

interface StockState {
  TwelveDataStockTimeSeries: TwelveDataStockTimeSeries;
  TwelveDataQuote: TwelveDataStockQuote;
  loading: boolean;
  errors: string;
  netGainLoss: string;
  previousDayData: string;
  outputSize: number;
}

type TimeSeries = {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};

type MetaData = {
  symbol: string;
  interval: string;
  currency: string;
  exchange_timezone: string;
  exchange: string;
  type: string;
};

type NewStockParametersForTimeSeries = {
  searchSymbol: string;
  interval: string;
  outputSize: string;
};

export {
  StockState,
  TwelveDataStockTimeSeries,
  TimeSeries,
  NewStockParametersForTimeSeries,
  TwelveDataStockQuote,
};

// POLYGON API
// interface Stock {
//   ticker: string;
//   queryCount: number;
//   resultsCount: number;
//   adjusted: boolean;
//   results: StockAtTime[];
//   status: string;
//   request_id: string;
//   count: number;
// }

// interface StockAtTime {
//   c: number;
//   h: number;
//   l: number;
//   n: number;
//   o: number;
//   t: number;
//   v: number;
//   vw: number;
// }

// interface Financials {
//   status: string;
//   results: [];
// }

// interface Daily {
//   status: string;
//   from: string;
//   symbol: string;
//   open: number;
//   high: number;
//   low: number;
//   close: number;
//   volume: number;
//   afterHours: number;
//   preMarket: number;
// }

// interface TickerDetails {
//   logo: string;
//   listdate: string;
//   cik: string;
//   bloomberg: string;
//   figi: string;
//   lei: string;
//   sic: number;
//   country: string;
//   industry: string;
//   sector: string;
//   marketcap: number;
//   employees: number;
//   phone: string;
//   ceo: string;
//   url: string;
//   description: string;
//   exchange: string;
//   name: string;
//   symbol: string;
//   exchangeSymbol: string;
//   hq_address: string;
//   hq_state: string;
//   hq_country: string;
//   type: string;
//   updated: string;
// }

// export interface Trade {
//   ev: string;
//   sym: string;
//   x: number;
//   i: string;
//   z: number;
//   p: number;
//   s: number;
//   c: number[];
//   t: number;
// }

// interface StockState {
//   stock?: Stock;
//   loading: boolean;
//   errors: string;
//   financials?: Financials;
//   daily?: Daily;
//   tickerDetails?: TickerDetails;
//   currentRange: string;
//   searchStock: string;
//   timeSpan: string;
//   fromDate: string;
//   toDate: string;
//   multiplier: number;
//   netGainLoss: string;
//   liveFeed: Trade[];
// }
