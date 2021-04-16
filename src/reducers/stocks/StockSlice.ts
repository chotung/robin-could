import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { FROM, LIMIT, MULTIPLIER, SORT, STOCKTICKER, TIMESPAN, TO, UNADJUSTED } from '../../constants/params';
import key from '../../secrets';
import { AppThunk } from '../../store';

interface Stock {
	ticker: string;
	queryCount:number;
	resultsCount:number;
	adjusted:boolean;
	results:any;
	status:string;
	request_id:string;
	count:number;
}

export interface StockState {
	stock: Stock;
	loading: boolean;
	errors: string;
	time: object[];
	price: object[];
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
	time: [],
	price: [],
	loading: false,
	errors: ''
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

		setStock: (state, { payload }: PayloadAction<Stock>) => {
			state.stock = payload
		}
	}
})

// API thunkActions
export const getStock = (): AppThunk => {
	return async (dispatch: (arg0: any) => void) => {
		dispatch(setLoading(true))
		try {
			const URL:string = `https://api.polygon.io/v2/aggs/ticker/${STOCKTICKER}/range/${MULTIPLIER}/${TIMESPAN}/${FROM}/${TO}?unadjusted=${UNADJUSTED}&sort=${SORT}&limit=${LIMIT}&apiKey=${key.apiKey}`
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





export const { setLoading, setErrors, setStock } = stockSlice.actions
export default stockSlice.reducer
export const stockSelector = (state: {stockStore: StockState}) => state.stockStore