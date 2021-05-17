import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PolygonState } from "../../clients/polygon/polygonClient/types";
export const initialState: PolygonState = {
  polygonStockDetails: {},
  loading: false,
  errors: "",
};

const polygonStockSlice = createSlice({
  name: "polygonStock",
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },

    setErrors: (state, { payload }: PayloadAction<string>) => {
      state.errors = payload;
    },

    setPolygonStockDetails: (state, { payload }: PayloadAction<any>) => {
      state.polygonStockDetails = payload;
    },
  },
});

export const { setLoading, setErrors } = polygonStockSlice.actions;
export default polygonStockSlice.reducer;
export const polygonStockSelector = (state: {
  polygonStore: PolygonState;
}): PolygonState => state.polygonStore;
