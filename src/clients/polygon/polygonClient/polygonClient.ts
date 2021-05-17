import axios from "axios";
import moment from "moment";
import {
  setLoading,
  setErrors,
  setPolygonStockDetails,
  initialState,
} from "../../../reducers/polygonStock/polygonStockSlice";
import { AppThunk } from "../../../store";
import { API_KEY as polygonApiKey } from "../polygonApiKeys";

const getPolygonTickerDetails = (search?: string): AppThunk => {
  return async (dispatch) => {
    // const searchStock = search || initialState.searchStock;
    // need to adjust to to account for weekends
    // endpoint will throw an error if it's the weekend
    dispatch(setLoading(true));
    try {
      // dispatch(setSearchStock(searchStock));
      // const URL = `https://api.polygon.io/v1/meta/symbols/${searchStock}/company?&apiKey=${API_KEY}`;
      const url = `https://api.polygon.io/v1/meta/symbols/AAPL/company?&apiKey=${polygonApiKey}`;
      // const res = await axios.get<PolygonTickerDetails>(URL);
      const res = await axios.get(url);
      dispatch(setLoading(false));
      dispatch(setPolygonStockDetails(res.data));
      // dispatch(setTickerDetails(res.data));
    } catch (error) {
      dispatch(setErrors(error));
      dispatch(setLoading(false));
    }
  };
};

export { getPolygonTickerDetails };
