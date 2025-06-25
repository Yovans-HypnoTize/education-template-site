import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../../lib/axios/axios-interceptor";

export interface IEnquiryState {
  error: unknown;
  enquiryList: any | null;
}

const initialState: IEnquiryState = {
  error: null,
  enquiryList: null,
};

export const GetEnquiryList = createAsyncThunk(
  "enquiry/GetEnquiryList",
  async (dataObj: Record<string, any> | undefined, thunkAPI) => {
    try {
      const { data } = await apiClient.get("enquiry/list", {
        params: {
          ...(dataObj || {}),
        },
      });
      return data;
    } catch (error) {
      const message = error || "data fetching failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const enquirySlice = createSlice({
  name: "enquiry",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetEnquiryList.pending, (state) => {
        state.error = null;
      })
      .addCase(GetEnquiryList.fulfilled, (state, action) => {
        state.error = null;
        state.enquiryList = action.payload;
      })
      .addCase(GetEnquiryList.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default enquirySlice.reducer;
