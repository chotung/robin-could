interface Stock {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results: StockAtTime[];
  status: string;
  request_id: string;
  count: number;
}

interface StockAtTime {
	c: number;
	h: number;
	l: number;
	n: number;
	o: number;
	t: number;
	v: number;
	vw: number;
}

interface Financials {
  status: string;
  results: [];
}

interface Daily {
  status: string;
  from: string;
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  afterHours: number;
  preMarket: number;
}

interface TickerDetails {
  logo: string;
  listdate: string;
  cik: string;
  bloomberg: string;
  figi: string;
  lei: string;
  sic: number;
  country: string;
  industry: string;
  sector: string;
  marketcap: number;
  employees: number;
  phone: string;
  ceo: string;
  url: string;
  description: string;
  exchange: string;
  name: string;
  symbol: string;
  exchangeSymbol: string;
  hq_address: string;
  hq_state: string;
  hq_country: string;
  type: string;
  updated: string;
}

export interface Trade {
  ev: string;
  sym: string;
  x: number;
  i: string;
  z: number;
  p: number;
  s: number;
  c: number[];
  t: number;
}

interface StockState {
  stock?: Stock;
  loading: boolean;
  errors: string;
  financials?: Financials;
  daily?: Daily;
  tickerDetails?: TickerDetails;
  currentRange: string;
  searchStock: string;
  timeSpan: string;
  fromDate: string;
  toDate: string;
  multiplier: number;
  netGainLoss: string;
  liveFeed: Trade[];
}

export { Stock, StockState, Financials, Daily, TickerDetails };