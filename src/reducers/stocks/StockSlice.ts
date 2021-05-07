// import moment from "moment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StockState, TwelveDataStockTimeSeries } from "./types";
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
  loading: false,
  errors: "",
  netGainLoss: "",
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
  // setStock,
  // setFinancials,
  // setDaily,
  setInterval,
  setSearchStock,
  setNetGainLoss,
  // setTickerDetails,
  // addToLiveFeed,
} = stockSlice.actions;
export default stockSlice.reducer;
export const stockSelector = (state: { stockStore: StockState }): StockState =>
  state.stockStore;
