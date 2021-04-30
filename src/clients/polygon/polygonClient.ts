import axios from "axios";
import moment from "moment";
import {
  PolygonStockRequest,
  PolygonAggregateStockResponse,
  PolygonDailyOpenClose,
  PolygonTickerDetails,
} from "./types";
import { AppThunk } from "../../store";
import {
  setErrors,
  setLoading,
  setSearchStock,
  setStock,
  setDaily,
  setTickerDetails,
  addToLiveFeed,
  initialState,
} from "../../reducers/stocks/StockSlice";
import { UNADJUSTED, SORT, LIMIT } from "../polygonUrlConstants";
import { API_KEY } from "../polgyonApiKeys";
import { createWebSocket, webSocketAction } from "../../helpers/WebSocket";

const BASE_URL = `https://api.polygon.io`;

const getPolygonAggregateStock = (
  stock?: PolygonStockRequest,
  search?: string 
): AppThunk => {
  return async (dispatch) => {
    const { multiplier, timeSpan, fromDate, toDate, searchStock } = stock
      ? stock
      : initialState;
    const searchTicker = search || searchStock || initialState.searchStock;
    dispatch(setLoading(true));
    try {
      dispatch(setSearchStock(searchTicker));
      const URL = `${BASE_URL}/v2/aggs/ticker/${searchTicker}/range/${multiplier}/${timeSpan}/${fromDate}/${toDate}?unadjusted=${UNADJUSTED}&sort=${SORT}&limit=${LIMIT}&apiKey=${API_KEY}`;
      const res = await axios.get<PolygonAggregateStockResponse>(URL);
			console.log(res)
      dispatch(setLoading(false));
      dispatch(setStock(res.data));
      // format the data before saving it
    } catch (error) {
      dispatch(setErrors(error));
      dispatch(setLoading(false));
    }
  };
};

const getPolygonDailyOpenClose = (search?: string): AppThunk => {
  return async (dispatch) => {
    const searchStock = search || initialState.searchStock;
    // need to adjust to to account for weekends
    // endpoint will throw an error if it's the weekend
    const earliestDailyOpenClose = moment()
      .subtract(1, "days")
      .format("YYYY-MM-D");
    dispatch(setLoading(true));
    try {
      dispatch(setSearchStock(searchStock));

      const URL = `https://api.polygon.io/v1/open-close/${searchStock}/${earliestDailyOpenClose}?unadjusted=true&apiKey=${API_KEY}`;
      const res = await axios.get<PolygonDailyOpenClose>(URL);
      dispatch(setLoading(false));
      dispatch(setDaily(res.data));
    } catch (error) {
      dispatch(setErrors(error));
      dispatch(setLoading(false));
    }
  };
};

const getPolygonTickerDetails = (search?: string): AppThunk => {
  return async (dispatch) => {
    const searchStock = search || initialState.searchStock;
    // need to adjust to to account for weekends
    // endpoint will throw an error if it's the weekend
    dispatch(setLoading(true));
    try {
      dispatch(setSearchStock(searchStock));
      const URL = `https://api.polygon.io/v1/meta/symbols/${searchStock}/company?&apiKey=${API_KEY}`;
      const res = await axios.get<PolygonTickerDetails>(URL);
      dispatch(setLoading(false));
      dispatch(setTickerDetails(res.data));
    } catch (error) {
      dispatch(setErrors(error));
      dispatch(setLoading(false));
    }
  };
};

const getPolygonLiveFeed = (search?: string): AppThunk => {
  return async (dispatch) => {
    const searchStock = search || initialState.searchStock;
    dispatch(setLoading(true));
    try {
      dispatch(setSearchStock(searchStock));
      const ws = createWebSocket(`wss://delayed.polygon.io/stocks`);
      // Need to pass different stock
      ws.onopen = () => {
        ws.send(webSocketAction("auth", API_KEY));
        ws.send(
          webSocketAction("subscribe", `"T. ${initialState.searchStock}"`)
        );
      };

      ws.onmessage = (event) => {
        const res = JSON.parse(event.data);
        dispatch(setLoading(false));
        dispatch(addToLiveFeed(res));
      };
    } catch (error) {
      dispatch(setErrors);
      dispatch(setLoading(false));
    }
  };
};

// const getFinancials = (): AppThunk => {
//   return async (dispatch) => {
//     dispatch(setLoading(true));
//     try {
//       const URL = `https://api.polygon.io/v2/reference/financials/AAPL?limit=1&type=YA&sort=-calendarDate&apiKey=${API_KEY}`;
//       const res = await axios.get(URL);
//       dispatch(setLoading(false));
//       dispatch(setFinancials(res.data));
//     } catch (error) {
//       dispatch(setErrors(error));
//       dispatch(setLoading(false));
//     }
//   };
// };

export {
  getPolygonAggregateStock,
  // getFinancials,
  getPolygonDailyOpenClose,
  getPolygonTickerDetails,
  getPolygonLiveFeed,
};
