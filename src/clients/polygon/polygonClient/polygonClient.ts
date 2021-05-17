import axios from "axios";
import moment from "moment";
import {
  setLoading,
  setErrors,
  initialState,
} from "../../../reducers/polygonStock/polygonStockSlice";
import { AppThunk } from "../../../store";

const getPolygonTickerDetails = (search?: string): AppThunk => {
  return async (dispatch) => {
    // const searchStock = search || initialState.searchStock;
    // need to adjust to to account for weekends
    // endpoint will throw an error if it's the weekend
    dispatch(setLoading(true));
    try {
      console.log("ticker");
      // dispatch(setSearchStock(searchStock));
      // const URL = `https://api.polygon.io/v1/meta/symbols/${searchStock}/company?&apiKey=${API_KEY}`;
      // const res = await axios.get<PolygonTickerDetails>(URL);
      dispatch(setLoading(false));
      // dispatch(setTickerDetails(res.data));
    } catch (error) {
      dispatch(setErrors(error));
      dispatch(setLoading(false));
    }
  };
};

export { getPolygonTickerDetails };
