export interface PolygonStockRequest {
  stockTicker: string;
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
