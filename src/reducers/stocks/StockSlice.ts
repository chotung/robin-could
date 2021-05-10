// import moment from "moment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  StockState,
  TwelveDataStockTimeSeries,
  TwelveDataStockQuote,
} from "./types";
// const currentDate = moment().format("YYYY-MM-D");

// Have to build around weekends
// stock information is skewed during those times

// Move to another file to allow for testing and reusability

// export const initialState: StockState = {
//   stock: undefined,
//   loading: false,
//   errors: "",
//   financials: undefined,
//   daily: undefined,
//   currentRange: "1D",
//   searchStock: "AAPL",
//   timeSpan: "minute",
//   fromDate: currentDate,
//   toDate: currentDate,
//   multiplier: 5,
//   netGainLoss: "0",
//   tickerDetails: undefined,
//   liveFeed: [],
// };

export const initialState: StockState = {
  TwelveDataStockTimeSeries: {
    meta: {
      symbol: "AAPL",
      interval: "1min",
      currency: "",
      exchange_timezone: "",
      exchange: "",
      type: "",
    },
    values: [],
    status: "",
  },
  TwelveDataQuoteState: {
    interval: "1day",
    symbol: "",
    name: "",
    exchange: "",
    currency: "",
    datetime: "",
    open: "",
    high: "",
    low: "",
    close: "",
    volume: "",
    previous_close: "",
    change: "",
    percent_change: "",
    average_volume: "",
    fifty_two_week: {
      low: "",
      high: "",
      low_change: "",
      high_change: "",
      low_change_percent: "",
      high_change_percent: "",
      range: "",
    },
    status: "",
  },
  loading: false,
  errors: "",
  netGainLoss: "",
  previousDayData: "",
  outputSize: 390,
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },

    setErrors: (state, { payload }: PayloadAction<string>) => {
      state.errors = payload;
    },

    setTimeSeries: (
      state,
      { payload }: PayloadAction<TwelveDataStockTimeSeries>
    ) => {
      state.TwelveDataStockTimeSeries = payload;
    },

    setInterval: (state, { payload }: PayloadAction<string>) => {
      state.TwelveDataStockTimeSeries.meta.interval = payload;
    },
    setQuoteInterval: (state, { payload }: PayloadAction<string>) => {
      state.TwelveDataQuoteState.interval = payload;
    },

    setQuote: (state, { payload }: PayloadAction<TwelveDataStockQuote>) => {
      state.TwelveDataQuoteState = {
        ...state.TwelveDataQuoteState,
        ...payload,
      };
    },

    setSearchStock: (state, { payload }: PayloadAction<string>) => {
      state.TwelveDataStockTimeSeries.meta.symbol = payload;
    },

    setNetGainLoss: (state, { payload }: PayloadAction<string>) => {
      state.netGainLoss = payload;
    },
  },
});

export const {
  setLoading,
  setErrors,
  setTimeSeries,
  setInterval,
  setSearchStock,
  setNetGainLoss,
  setQuote,
} = stockSlice.actions;
export default stockSlice.reducer;
export const stockSelector = (state: { stockStore: StockState }): StockState =>
  state.stockStore;
