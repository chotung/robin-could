import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
import { AppThunk } from '../../store';

interface Stock {
	name: string;
	price: number;
}

export interface StockState {
	stock: Stock;
	loading: boolean;
	errors: string;
}

const initialState: StockState = {
	stock: {
		name: '',
		price: 0
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

		setPhotos: (state, { payload }: PayloadAction<Stock>) => {
			state.stock = payload
		}
	}
})

export const { setLoading, setErrors, setPhotos } = stockSlice.actions
export default stockSlice.reducer
export const stockSelector = (state: {stockStore: StockState}) => state.stockStore