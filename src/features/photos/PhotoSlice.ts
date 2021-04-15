import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '../../store'

export interface PhotoState {
	photos: object[];
	loading: boolean;
	errors: string;
};

const initialState: PhotoState = {
	photos: [],
	loading: false,
	errors: ""
}

const photoSlice = createSlice({
	name: 'photos',
	initialState,
	reducers: {
		setLoading: (state: { loading: boolean; }, { payload }: PayloadAction<boolean>) => {
			state.loading = payload
		},

		setErrors: (state: { errors: string; }, { payload }: PayloadAction<string>) => {
			state.errors = payload
		},

		setPhotos: (state: { photos: object[]; }, { payload }: PayloadAction<object[]>) => {
			state.photos = payload
		}
	}
})

export const getPhotos = (): AppThunk => {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(setLoading(true))
    try {
      const baseURL: string = "https://api.nasa.gov/planetary/apod"
      // your apiKey should ideally be in a .env file
      const apiKey = "AIzaSyBDipCJKnoTuhByJP2pB4A7Fx4SAOXoy-k"

      const res = await axios.get(
        `${baseURL}?api_key=${apiKey}&start_date=2020-05-07&end_date=2020-05-09`
      )

      dispatch(setLoading(false))
      dispatch(setPhotos(res.data))
    } catch (error) {
      dispatch(setErrors(error))
      dispatch(setLoading(false))
    }
  }
}


export const { setLoading, setErrors, setPhotos } = photoSlice.actions

export default photoSlice.reducer

export const photosSelector = (state: { photosStore: PhotoState }) => state.photosStore