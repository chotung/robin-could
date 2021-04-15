import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { DATE, LIMIT, REVERSE, TICKER, TIME_STAMP, TIME_STAMP_LIMIT } from '../../constants/params';
import apikey from '../../../secrets.json';
import { AppThunk } from '../../store';

interface Stock {
	db_latency: number;
	map: any;
	results: object[];
	results_count: number;
	success: boolean;
	ticker: string;
}

export interface StockState {
	stock: Stock;
	loading: boolean;
	errors: string;
}

const initialState: StockState = {
	stock: {
		db_latency: 0,
		map: null,
		results: [],
		results_count: 0,
		success: false,
		ticker: ''
	},
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
			const apikey = 'cmMBCknpq5xC2JDPNY_TqRir8jWGKBSK'
			const URL: string = `https://api.polygon.io/v2/ticks/stocks/trades/${TICKER}/${DATE}?timestamp=${TIME_STAMP}&timestampLimit=${TIME_STAMP_LIMIT}&reverse=${REVERSE}&limit=${LIMIT}&apiKey=${apikey}`

			const res = await axios.get(URL)
			dispatch(setLoading(false))
			dispatch(setStock(res.data))
		} catch (error) {
			
		}
	}
}

export const { setLoading, setErrors, setStock } = stockSlice.actions
export default stockSlice.reducer
export const stockSelector = (state: {stockStore: StockState}) => state.stockStore