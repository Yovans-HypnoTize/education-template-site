import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../../lib/axios/axios-interceptor";

export interface IRegisteredUser {
  error: unknown;
  registeredUserList: any | null;
  userDetails: any | null;
}

const initialState: IRegisteredUser = {
  error: null,
  registeredUserList: null,
  userDetails: null,
};

export const GetRegisterUserList = createAsyncThunk(
  "registeredUser/GetRegisterUserList",
  async (dataObj: Record<string, any> | undefined, thunkAPI) => {
    try {
      const { data } = await apiClient.get("user/list", {
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

export const GetRegisterUserById = createAsyncThunk(
  "registeredUser/GetRegisterUserById",
  async (dataObj: Record<string, any> | undefined, thunkAPI) => {
    try {
      const { data } = await apiClient.get(`user/${dataObj?.id}`, {
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

export const registeredUserSlice = createSlice({
  name: "registeredUser",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetRegisterUserList.pending, (state) => {
        state.error = null;
      })
      .addCase(GetRegisterUserList.fulfilled, (state, action) => {
        state.error = null;
        state.registeredUserList = action.payload;
      })
      .addCase(GetRegisterUserList.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(GetRegisterUserById.pending, (state) => {
        state.error = null;
      })
      .addCase(GetRegisterUserById.fulfilled, (state, action) => {
        state.error = null;
        state.userDetails = action.payload;
      })
      .addCase(GetRegisterUserById.rejected, (state, action) => {
        state.error = action.payload;
        state.userDetails = null;
      });
  },
});

export default registeredUserSlice.reducer;
