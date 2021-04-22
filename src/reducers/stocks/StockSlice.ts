import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
import { LIMIT, SORT, UNADJUSTED } from "../../constants/params";
import { createWebSocket, webSocketAction } from "../../helpers/WebSocket";
import key from "../../secrets";
import { AppThunk } from "../../store";
// Have to build around weekends 
// stock information is skewed during those times
const currentDate = moment().format("YYYY-MM-D");

interface Stock {
	ticker:string;
	queryCount:number;
	resultsCount: number;
	adjusted: boolean;
	results:[];
	status: string;
	request_id:string;
	count: number;
}

interface Financials {
	status: string;
	results: [];
}

interface Daily {
	status:string;
	from:string;
	symbol:string;
	open:number;
	high:number;
	low:number;
	close:number;
	volume:number;
	afterHours:number;
	preMarket:number;
}

interface TickerDetails {
	logo:string;
	listdate:string;
	cik:string;
	bloomberg:string;
	figi: string;
	lei:string;
	sic:number;
	country:string;
	industry:string;
	sector:string;
	marketcap:number;
	employees:number;
	phone:string;
	ceo:string;
	url:string;
	description:string;
	exchange:string;
	name:string;
	symbol:string;
	exchangeSymbol:string;
	hq_address:string;
	hq_state:string;
	hq_country:string;
	type:string;
	updated:string;
}

interface Trade {
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


export interface StockState {
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

const initialState: StockState = {
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
	liveFeed:[]
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
			state.tickerDetails = payload
		},

		addToLiveFeed: (state, { payload }: PayloadAction<any>) => {
			state.liveFeed = state.liveFeed.concat(payload)
		}

  },
});

// API thunkActions
export const getStockInAggragateRange = (stock?: any, search?: any): AppThunk => {
  return async (dispatch: (arg0: any) => void) => {
    const { multiplier, timeSpan, fromDate, toDate } = stock ? stock : initialState;
		const searchStock =  search || initialState.searchStock  
    dispatch(setLoading(true));
    try {
			dispatch(setSearchStock(searchStock))
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
      const URL = `https://api.polygon.io/v2/reference/financials/AAPL?limit=1&type=YA&sort=-calendarDate&apiKey=${key.apiKey}`;
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
			dispatch(setSearchStock(searchStock))

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

export const getTickerDetails = (stock?: any, search?: any): AppThunk => {
  return async (dispatch: (arg0: any) => void) => {
		const searchStock =  search || initialState.searchStock  
    // need to adjust to to account for weekends
    // endpoint will throw an error if it's the weekend
    dispatch(setLoading(true));
    try {
			dispatch(setSearchStock(searchStock))
      const URL = `https://api.polygon.io/v1/meta/symbols/${searchStock}/company?&apiKey=${key.apiKey}`
      const res = await axios.get(URL);
      dispatch(setLoading(false));
      dispatch(setTickerDetails(res.data));
    } catch (error) {
      dispatch(setErrors(error));
      dispatch(setLoading(false));
    }
  };
};


export const getLiveFeed = (search?:any): AppThunk => {
	return async (dispatch: (arg0: any) => void) => {
		const searchStock = search || initialState.searchStock
		dispatch(setLoading(true))
		try {
			dispatch(setSearchStock(searchStock))
			const ws = createWebSocket(`wss://delayed.polygon.io/stocks`)
			ws.onopen = () => {
				ws.send(webSocketAction("auth", key.apiKey))
				ws.send(webSocketAction("subscribe", "T.AAPL"))
			}

			ws.onmessage = (event:any) => {
				const res = JSON.parse(event.data)

				dispatch(setLoading(false))
				dispatch(addToLiveFeed(res))
			}

		} catch (error) {
			dispatch(setErrors)
			dispatch(setLoading(false))
		}
	}
}



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
	addToLiveFeed
} = stockSlice.actions;
export default stockSlice.reducer;
export const stockSelector = (state: { stockStore: StockState }) =>
  state.stockStore;
