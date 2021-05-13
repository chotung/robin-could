import moment from "moment";

type NewStockDataRequestParameters = TwelveDataStockTimeSeries;
type FormattedData = {
  open: string[];
  time: moment.Moment[];
};

interface PolygonStock {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results: StockAtTime[];
  status: string;
  request_id: string;
  count: number;
}
type StockAtTime = {
  c: number;
  h: number;
  l: number;
  n: number;
  o: number;
  t: number;
  v: number;
  vw: number;
};

type StockObjectInAggregatedWindow = {
  time: moment.Moment;
  open: number;
  close: number;
  highest: number;
  lowest: number;
  volume: number;
  volumeWeightedAvgPrice: number;
  numberOfTransactionInRange: number;
};

export {
  NewStockDataRequestParameters,
  FormattedData,
  PolygonStock,
  StockAtTime,
  StockObjectInAggregatedWindow,
};
