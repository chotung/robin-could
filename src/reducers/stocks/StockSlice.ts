import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { DATE, FROM_DATE, LIMIT, MULTIPLIER, SORT, STOCKTICKER, TIMESPAN, TO_DATE, UNADJUSTED } from '../../constants/params';
import key from '../../secrets';
import { AppThunk } from '../../store';

// interface Stock {
// 	ticker: string;
// 	queryCount:number;
// 	resultsCount:number;
// 	adjusted:boolean;
// 	results:any;
// 	status:string;
// 	request_id:string;
// 	count:number;
// }


// Can be more explicit when the information required is known
export interface StockState {
	stock: any;
	loading: boolean;
	errors: string;
	financials: any;
	daily: any;
}

const initialState: StockState = {
	stock: {
		ticker: '',
		queryCount: 0,
		resultsCount: 0,
		adjusted: false,
		results:[],
		status: '',
		request_id: '',
		count: 0
	},
	loading: false,
	errors: '',
	financials: null,
	daily: null
}

const stockSlice = createSlice({
	name: 'stock',
	initialState,
	reducers: {
		setLoading: (state, { payload }: PayloadAction<boolean>) => {	
			state.loading = payload
		},

		setErrors: (state, { payload }: PayloadAction<string>) => {
			state.errors = payload
		},

		setStock: (state, { payload }: PayloadAction<any>) => {
			state.stock = payload
		},

		setFinancials: (state, { payload }: PayloadAction<any>) => {
			state.financials = payload
		},

		setDaily: (state, { payload }: PayloadAction<any>) => {
			state.daily = payload
		},

	}
})

// API thunkActions
export const getStockInAggragateRange = (): AppThunk => {
	return async (dispatch: (arg0: any) => void) => {
		dispatch(setLoading(true))
		try {
			const URL:string = `https://api.polygon.io/v2/aggs/ticker/${STOCKTICKER}/range/${MULTIPLIER}/${TIMESPAN}/${FROM_DATE}/${TO_DATE}?unadjusted=${UNADJUSTED}&sort=${SORT}&limit=${LIMIT}&apiKey=${key.apiKey}`
			const res = await axios.get(URL)
			dispatch(setLoading(false))
			dispatch(setStock(res.data))
			// format the data before saving it
		} catch (error) {
			dispatch(setErrors(error))
      dispatch(setLoading(false))
		}
	}
}

export const getFinancials = (): AppThunk => {
	return async (dispatch: (arg0: any) => void) => {
		dispatch(setLoading(true)) 
		try {
			const URL:string = `https://api.polygon.io/v2/reference/financials/AAPL?limit=1&type=Q&sort=-calendarDate&apiKey=${key.apiKey}`
			const res = await axios.get(URL)
			dispatch(setLoading(false))
			dispatch(setFinancials(res.data))
		} catch (error) {
			dispatch(setErrors(error))
      dispatch(setLoading(false))
		}
	}
}

export const setDailyOpenClose = (): AppThunk => {
	return async (dispatch: (arg0: any) => void) => {
		dispatch(setLoading(true)) 
		try {
			const URL:string = `https://api.polygon.io/v1/open-close/AAPL/2021-04-16?unadjusted=true&apiKey=${key.apiKey}`
			const res = await axios.get(URL)
			dispatch(setLoading(false))
			dispatch(setDaily(res.data))
		} catch (error) {
			dispatch(setErrors(error))
      dispatch(setLoading(false))
		}
	}
}








export const { setLoading, setErrors, setStock, setFinancials, setDaily } = stockSlice.actions
export default stockSlice.reducer
export const stockSelector = (state: {stockStore: StockState}) => state.stockStore