import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../../lib/axios/axios-interceptor";

export interface IAuthState {
  error: unknown;
  user: any | null;
  loading: boolean;
  countryList: any;
  stateList: any;
  cityList: any;
}

const initialState: IAuthState = {
  error: null,
  user: null,
  loading: false,
  countryList: [],
  stateList: [],
  cityList: [],
};

export const LoginAction = createAsyncThunk("auth/login", async (dataObj, thunkAPI) => {
  try {
    const { data } = await apiClient.post("auth/login", dataObj);
    return data;
  } catch (error) {
    const message = error || "data fetching failed";
    return thunkAPI.rejectWithValue(message);
  }
});

export const LogoutAction = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const { data } = await apiClient.post("auth/logout");
    return data;
  } catch (error) {
    const message = error || "data fetching failed";
    return thunkAPI.rejectWithValue(message);
  }
});

export const GetProfile = createAsyncThunk(
  "auth/GetProfile",
  async (dataObj: Record<string, any> | undefined, thunkAPI) => {
    try {
      const { data } = await apiClient.get(`user`, {
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

export const UpdateProfileAction = createAsyncThunk(
  "auth/UpdateProfileAction",
  async (dataObj: Record<string, any> | undefined, thunkAPI) => {
    try {
      const { data } = await apiClient.put(`user`, dataObj || {}, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message || "Data fetching failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const UpdateProfileImageAction = createAsyncThunk(
  "auth/UpdateProfileAction",
  async (dataObj: Record<string, any> | undefined, thunkAPI) => {
    try {
      const { data } = await apiClient.put(`user/profile`, dataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Data fetching failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const GetCountryList = createAsyncThunk(
  "auth/GetCountryList",
  async (dataObj: Record<string, any> | undefined, thunkAPI) => {
    try {
      const { data } = await apiClient.get(`country/list`, {
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

export const GetStateListByCountryId = createAsyncThunk(
  "auth/GetStateListByCountryId",
  async (dataObj: Record<string, any> | undefined, thunkAPI) => {
    try {
      const { data } = await apiClient.get(`state`, {
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

export const GetCityListByStateId = createAsyncThunk(
  "auth/GetCityListByStateId",
  async (dataObj: Record<string, any> | undefined, thunkAPI) => {
    try {
      const { data } = await apiClient.get(`state`, {
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(LoginAction.pending, (state) => {
        state.error = null;
      })
      .addCase(LoginAction.fulfilled, (state, action) => {
        state.error = null;
        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(LoginAction.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(GetProfile.pending, (state) => {
        state.error = null;
      })
      .addCase(GetProfile.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload;
      })
      .addCase(GetProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.user = null;
      })
      .addCase(GetCountryList.fulfilled, (state, action) => {
        state.error = null;
        state.countryList = action.payload;
      })
      .addCase(GetStateListByCountryId.fulfilled, (state, action) => {
        state.error = null;
        state.stateList = action.payload;
      })
      .addCase(GetCityListByStateId.fulfilled, (state, action) => {
        state.error = null;
        state.cityList = action.payload;
      });
  },
});

export const { startLoading, stopLoading } = authSlice.actions;

export default authSlice.reducer;
