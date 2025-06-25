import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../../lib/axios/axios-interceptor";

export const GetDashboardDetailsAction = createAsyncThunk(
  "dashboard/GetDashboardDetailsAction",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get("dashboard");
      return response.data;
    } catch (error) {
      const message = error || "data fetching failed";
      console.log(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const GetDashboardchartAction = createAsyncThunk(
  "dashboard/GetDashboardChatAction",
  async (dataObj:any, thunkAPI) => {
    try {
      const response = await apiClient.get("/dashboard/list", {
        params: {
          ...dataObj,
        },
      });
      return response.data;
    } catch (error) {
      const message = error || "data fetching failed";
      console.log(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    details: [] as any,
    error: null as null | unknown,
    chart: [] as any,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetDashboardDetailsAction.pending, (state) => {
        state.error = null;
        console.log("from pending", state);
      })
      .addCase(GetDashboardDetailsAction.fulfilled, (state, action) => {
        state.error = null;
        state.details = action.payload;
      })
      .addCase(GetDashboardDetailsAction.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(GetDashboardchartAction.pending, (state) => {
        state.error = null;
        console.log("from pending", state);
      })
      .addCase(GetDashboardchartAction.fulfilled, (state, action) => {
        state.error = null;
        state.chart = action.payload;
      })
      .addCase(GetDashboardchartAction.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
