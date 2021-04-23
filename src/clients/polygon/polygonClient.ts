// import { PolygonStockRequest, PolygonAggregateStockResponse } from "./types";
// import axios from "axios";
// import { UNADJUSTED, SORT, LIMIT } from "../../constants/polygonUrlConstants";
// import key from "../../secrets";
// const BASE_URL = `https://api.polygon.io`;
// // export {
// // 	getStock: async (request: PolygonStockRequest): PolygonAggregateStockResponse => {
// // 		const { stockTicker, multiplier, fromDate, toDate, timeSpan } = request
// // 		const url = `${BASE_URL}/v2/aggs/ticker/${stockTicker}/range/${multiplier}/${timeSpan}/${fromDate}/${toDate}?unadjusted=${UNADJUSTED}&sort=${SORT}&limit=${LIMIT}&apiKey=${key.apiKey}`
// // 		const res = await axios.get(url) as PolygonAggregateStockResponse;
// // 		return res
// // 	},
// // }

// const getStock = (
//   request: PolygonStockRequest
// ): Promise<PolygonAggregateStockResponse> => {
//   const { stockTicker, multiplier, fromDate, toDate, timeSpan } = request;
//   const url = `${BASE_URL}/v2/aggs/ticker/${stockTicker}/range/${multiplier}/${timeSpan}/${fromDate}/${toDate}?unadjusted=${UNADJUSTED}&sort=${SORT}&limit=${LIMIT}&apiKey=${key.apiKey}`;
//   return axios.get(url) as Promise<PolygonAggregateStockResponse>;
// };

// // export const getStockInAggragateRange = (stock?: any, search?: any): AppThunk => {
// //   return async (dispatch: (arg0: any) => void) => {
// //     const { multiplier, timeSpan, fromDate, toDate } = stock ? stock : initialState;
// // 		const searchStock =  search || initialState.searchStock
// //     dispatch(setLoading(true));
// //     try {
// // 			dispatch(setSearchStock(searchStock))
// //       const URL = `https://api.polygon.io/v2/aggs/ticker/${searchStock}/range/${multiplier}/${timeSpan}/${fromDate}/${toDate}?unadjusted=${UNADJUSTED}&sort=${SORT}&limit=${LIMIT}&apiKey=${key.apiKey}`;
// //       const res = await axios.get(URL);
// //       dispatch(setLoading(false));
// //       dispatch(setStock(res.data));
// //       // format the data before saving it
// //     } catch (error) {
// //       dispatch(setErrors(error));
// //       dispatch(setLoading(false));
// //     }
// //   };
// // };

export default {};
