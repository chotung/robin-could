import axios from "axios";
import {
  setLoading,
  setErrors,
  setPolygonStockDetails,
} from "../../../reducers/polygonStock/polygonStockSlice";
import { AppThunk } from "../../../store";
import { API_KEY as polygonApiKey } from "../polygonApiKeys";

const getPolygonTickerDetails = (search?: string): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      // dispatch(setSearchStock(searchStock));

      const url = `https://api.polygon.io/v1/meta/symbols/${search}/company?&apiKey=${polygonApiKey}`;
      // <PolygonTickerDetails>(URL);
      const res = await axios.get(url);
      dispatch(setLoading(false));
      dispatch(setPolygonStockDetails(res.data));
    } catch (error) {
      dispatch(setErrors(error));
      dispatch(setLoading(false));
    }
  };
};

export { getPolygonTickerDetails };
