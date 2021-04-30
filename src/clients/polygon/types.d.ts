export interface PolygonStockRequest {
  searchStock: string;
  multiplier: number;
  fromDate: string;
  toDate: string;
  timeSpan: string;
}

export interface PolygonAggregateStockResponse {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results: [];
  status: string;
  request_id: string;
  count: number;
}

export interface PolygonDailyOpenClose {
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

export interface PolygonTickerDetails {
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
  tags: string[];
  similar: string[];
  active: boolean;
}