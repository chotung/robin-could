import { configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import stockSliceReducer from "../reducers/stocks/StockSlice";
import { StockState } from "../reducers/stocks/types";

// can define them here so you don't have to write it in the slice/reducer
// make a separate file for custom typing or make it more dynamic?
// The AppThunk type will help us in writing type definitions for thunk actions
export type AppThunk = ThunkAction<
  Promise<void>,
  StockState,
  unknown,
  Action<string>
>;

const store = configureStore({
  reducer: {
    // the convention is to name this photos rather than photosStore but photosStore is clearer to me.
    // photosStore: photosSliceReducer,
    stockStore: stockSliceReducer,
    // anyOtherStore: anyOtherSlice,
    // middleware: ['array of middlewares'],
  },
  devTools: process.env.NODE_ENV !== "development" ? false : true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
