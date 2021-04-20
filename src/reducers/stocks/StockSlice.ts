import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
import { LIMIT, SORT, UNADJUSTED } from "../../constants/params";
import key from "../../secrets";
import { AppThunk } from "../../store";

const currentDate = moment().subtract(1, "day").format("YYYY-MM-D");

export interface StockState {
  stock: any;
  loading: boolean;
  errors: string;
  financials: any;
  daily: any;
  currentRange: string;
  searchStock: string;
  timeSpan: string;
  fromDate: string;
  toDate: string;
  multiplier: number;
	netGainLoss: any
}

const initialState: StockState = {
  stock: {},
  loading: false,
  errors: "",
  financials: null,
  daily: null,
  currentRange: "1D",
  searchStock: "AAPL",
  timeSpan: "minute",
  fromDate: currentDate,
  toDate: currentDate,
  multiplier: 5,
	netGainLoss: null
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

    setStock: (state, { payload }: PayloadAction<any>) => {
      state.stock = payload;
    },

    setFinancials: (state, { payload }: PayloadAction<any>) => {
      state.financials = payload;
    },

    setDaily: (state, { payload }: PayloadAction<any>) => {
      state.daily = payload;
    },

    setRange: (state, { payload }: PayloadAction<any>) => {
      state.currentRange = payload;
    },

    setSearchStock: (state, { payload }: PayloadAction<any>) => {
      state.searchStock = payload;
    },
    setNetGainLoss: (state, { payload }: PayloadAction<any>) => {
      state.netGainLoss = payload;
    },


  },
});

// API thunkActions
export const getStockInAggragateRange = (stock?: any, search?: any): AppThunk => {
  return async (dispatch: (arg0: any) => void) => {
    const { multiplier, timeSpan, fromDate, toDate } = stock ? stock : initialState;
		const searchStock =  search || initialState.searchStock  
    dispatch(setLoading(true));
    try {
			dispatch(setSearchStock(search))
      const URL = `https://api.polygon.io/v2/aggs/ticker/${searchStock}/range/${multiplier}/${timeSpan}/${fromDate}/${toDate}?unadjusted=${UNADJUSTED}&sort=${SORT}&limit=${LIMIT}&apiKey=${key.apiKey}`;
      const res = await axios.get(URL);
      dispatch(setLoading(false));
      dispatch(setStock(res.data));
      // format the data before saving it
    } catch (error) {
      dispatch(setErrors(error));
      dispatch(setLoading(false));
    }
  };
};

export const getFinancials = (): AppThunk => {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(setLoading(true));
    try {
      const URL = `https://api.polygon.io/v2/reference/financials/AAPL?limit=1&type=Q&sort=-calendarDate&apiKey=${key.apiKey}`;
      const res = await axios.get(URL);
      dispatch(setLoading(false));
      dispatch(setFinancials(res.data));
    } catch (error) {
      dispatch(setErrors(error));
      dispatch(setLoading(false));
    }
  };
};

export const getDailyOpenClose = (stock?: any, search?: any): AppThunk => {
  return async (dispatch: (arg0: any) => void) => {
		const searchStock =  search || initialState.searchStock  
    // need to adjust to to account for weekends
    // endpoint will throw an error if it's the weekend
    const earliestDailyOpenClose = moment()
      .subtract(1, "days")
      .format("YYYY-MM-D");
    dispatch(setLoading(true));
    try {
			dispatch(setSearchStock(search))

      const URL = `https://api.polygon.io/v1/open-close/${searchStock}/${earliestDailyOpenClose}?unadjusted=true&apiKey=${key.apiKey}`;
      const res = await axios.get(URL);
      dispatch(setLoading(false));
      dispatch(setDaily(res.data));
    } catch (error) {
      dispatch(setErrors(error));
      dispatch(setLoading(false));
    }
  };
};


export const {
  setLoading,
  setErrors,
  setStock,
  setFinancials,
  setDaily,
  setRange,
	setSearchStock,
	setNetGainLoss
} = stockSlice.actions;
export default stockSlice.reducer;
export const stockSelector = (state: { stockStore: StockState }) =>
  state.stockStore;
