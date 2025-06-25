import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../pages/auth/features/authSlice";
import registeredUserSlice from "../pages/registeredUsers/features/registeredUserSlice";
import ticketSlice from "../pages/tickets/features/ticketSlice";
import dashboardSlice from "../pages/dashboard/features/dashboardSlice";
import enquirySlice from "../pages/enquiry/features/enquirySlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    registeredUser: registeredUserSlice,
    ticket: ticketSlice,
    dashboard: dashboardSlice,
    enquiry:enquirySlice

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
