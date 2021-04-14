import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import photosSliceReducer from './features/photos/PhotoSlice';
import { PhotoState } from './features/photos/PhotoSlice';

// The AppThunk type will help us in writing type definitions for thunk actions
export type AppThunk = ThunkAction<void, PhotoState, unknown, Action<string>>;

const store = configureStore({
	reducer: {
		// the convention is to name this photos rather than photosStore but photosStore is clearer to me.
    photosStore: photosSliceReducer,

    // anyOtherStore: anyOtherSlice,
		// middleware: ['array of middlewares'],
	},
	devTools: process.env.NODE_ENV !== 'development' ? false : true,
})

ReactDOM.render(
  <React.StrictMode>
		<Provider store={store}>
    	<App />
		</Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
