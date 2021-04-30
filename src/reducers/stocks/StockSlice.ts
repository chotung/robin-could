import moment from "moment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Stock, StockState, Financials, Daily, TickerDetails, Trade } from "./types";
const currentDate = moment().format("YYYY-MM-D");

// Have to build around weekends
// stock information is skewed during those times

// Move to another file to allow for testing and reusability

export const initialState: StockState = {
  stock: undefined,
  loading: false,
  errors: "",
  financials: undefined,
  daily: undefined,
  currentRange: "1D",
  searchStock: "AAPL",
  timeSpan: "minute",
  fromDate: currentDate,
  toDate: currentDate,
  multiplier: 5,
  netGainLoss: "0",
  tickerDetails: undefined,
  liveFeed: [],
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

    setStock: (state, { payload }: PayloadAction<Stock>) => {
      state.stock = payload;
    },

    setFinancials: (state, { payload }: PayloadAction<Financials>) => {
      state.financials = payload;
    },

    setDaily: (state, { payload }: PayloadAction<Daily>) => {
      state.daily = payload;
    },

    setRange: (state, { payload }: PayloadAction<string>) => {
      state.currentRange = payload;
    },

    setSearchStock: (state, { payload }: PayloadAction<string>) => {
      state.searchStock = payload;
    },

    setNetGainLoss: (state, { payload }: PayloadAction<string>) => {
      state.netGainLoss = payload;
    },

    setTickerDetails: (state, { payload }: PayloadAction<TickerDetails>) => {
      state.tickerDetails = payload;
    },

    addToLiveFeed: (state, { payload }: PayloadAction<Trade>) => {
      state.liveFeed = state.liveFeed.concat(payload);
    },
  },
});

export const {
  setLoading,
  setErrors,
  setStock,
  setFinancials,
  setDaily,
  setRange,
  setSearchStock,
  setNetGainLoss,
  setTickerDetails,
  addToLiveFeed,
} = stockSlice.actions;
export default stockSlice.reducer;
export const stockSelector = (state: { stockStore: StockState }): StockState => state.stockStore;
