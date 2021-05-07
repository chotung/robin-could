import axios from "axios";
import { AppThunk } from "../../../store";
import {
  setErrors,
  setLoading,
  setTimeSeries,
  initialState,
  setQuote,
} from "../../../reducers/stocks/StockSlice";
import { NewStockParametersForTimeSeries } from "../../../reducers/stocks/types";
import { API_KEY } from "../twelveDataApiKey";

const BASE_URL = "https://api.twelvedata.com";
//• Supports: 1min, 5min, 15min, 30min, 45min, 1h, 2h, 4h, 1day, 1week, 1month
/*
	outputsize should be alter by the interval
	Time setups
		1day: 1 || 5 min =  390 for the stock opening and closing hours
		5day: 5 min =  390 * 5
		1 month: 1h = 390 * 4 for number of weeks
*/

const twelveDataTimeSeries = (
  stock?: NewStockParametersForTimeSeries,
  search?: string
): AppThunk => {
  const interval = stock
    ? stock.interval
    : initialState.TwelveDataStockTimeSeries.meta.interval;
  const outputSize = stock ? stock.outputSize : initialState.outputSize;
  const searchTicker = search
    ? search
    : initialState.TwelveDataStockTimeSeries.meta.symbol;

  return async (dispatch) => {
    const URL = `${BASE_URL}/time_series?symbol=${searchTicker}&interval=${interval}&outputsize=${outputSize}&apikey=${API_KEY}`;
    const res = await axios.get(URL);
    dispatch(setLoading(true));
    dispatch(setTimeSeries(res.data));
    try {
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setErrors(error));
      dispatch(setLoading(false));
    }
  };
};

const twelveDataQuote = (
  stock?: NewStockParametersForTimeSeries,
  search?: string
): AppThunk => {
  const interval = stock
    ? stock.interval
    : initialState.TwelveDataQuote.interval;
  const searchTicker = search
    ? search
    : initialState.TwelveDataStockTimeSeries.meta.symbol;

  return async (dispatch) => {
    const URL = `${BASE_URL}/quote?symbol=${searchTicker}&interval=${interval}&apikey=${API_KEY}`;
    const res = await axios.get(URL);
    dispatch(setLoading(true));
    dispatch(setQuote(res.data));
    try {
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setErrors(error));
      dispatch(setLoading(false));
    }
  };
};

export { twelveDataTimeSeries, twelveDataQuote };
