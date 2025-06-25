import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../../lib/axios/axios-interceptor";

export interface ITicket {
  error: unknown;
  ticketList: any | null;
  ticketDetails: any | null;
  userDetails: any | null;
}

const initialState: ITicket = {
  error: null,
  ticketList: null,
  ticketDetails: null,
  userDetails: null,
};

export const GetTicketList = createAsyncThunk(
  "ticket/GetTicketList",
  async (dataObj: Record<string, any> | undefined, thunkAPI) => {
    try {
      const { data } = await apiClient.get("support-ticket/list", {
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

export const GetTicketById = createAsyncThunk(
  "ticket/GetTicketById",
  async (dataObj: Record<string, any> | undefined, thunkAPI) => {
    try {
      const { data } = await apiClient.get(`support-ticket/${dataObj?.id}`, {
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

export const UpdateTicketById = createAsyncThunk(
  "ticket/UpdateTicketById",
  async (dataObj: Record<string, any> | undefined, thunkAPI) => {
    try {
      const { data } = await apiClient.put(
        `support-ticket/${dataObj?.id}`,
        {
          ...(dataObj || {}),
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return data;
    } catch (error) {
      const message = error || "data fetching failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const GetUserById = createAsyncThunk(
  "ticket/GetUserById",
  async (dataObj: Record<string, any> | undefined, thunkAPI) => {
    try {
      const { data } = await apiClient.get(`user/${dataObj?.id}`, {
        params: {
          ...(dataObj || {}),
        },
      });
      return { data, type: dataObj?.type };
    } catch (error) {
      const message = error || "data fetching failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetTicketList.pending, (state) => {
        state.error = null;
      })
      .addCase(GetTicketList.fulfilled, (state, action) => {
        state.error = null;
        state.ticketList = action.payload;
      })
      .addCase(GetTicketList.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(GetTicketById.pending, (state) => {
        state.error = null;
      })
      .addCase(GetTicketById.fulfilled, (state, action) => {
        state.error = null;
        state.ticketDetails = action.payload;
      })
      .addCase(GetTicketById.rejected, (state, action) => {
        state.error = action.payload;
        state.ticketDetails = null;
      })
      .addCase(GetUserById.pending, (state) => {
        state.error = null;
      })
      .addCase(GetUserById.fulfilled, (state, action) => {
        state.error = null;
        if (!state.userDetails) {
          state.userDetails = {};
        }
        state.userDetails[action.payload.type] = action.payload.data;
      })
      .addCase(GetUserById.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default ticketSlice.reducer;
