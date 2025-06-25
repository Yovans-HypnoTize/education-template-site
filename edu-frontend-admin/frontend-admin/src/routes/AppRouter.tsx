import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Menu from "../pages/menu/Menu";
import SubmenuItem from "../pages/menu/submenus/SubmenuItem";
import UserManagement from "../pages/userManagement/UserManagement";
import NotFound from "../layout/NotFound";
import Tickets from "../pages/tickets/Tickets";
import RegisteredUsers from "../pages/registeredUsers/RegisteredUsers";
import RegisterUserDetails from "../pages/registeredUsers/RegisterUserDetails";
import TicketDetails from "../pages/tickets/TicketDetails";
import Profile from "../pages/auth/Profile";
import Enquiry from "../pages/enquiry/Enquiry";
import EnquiryDetails from "../pages/enquiry/EnquiryDetails";

const router = createBrowserRouter(
  [
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
      ],
    },
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <ProtectedRoute element={<Dashboard />} />,
        },
        {
          path: "/profile",
          element: <ProtectedRoute element={<Profile />} />,
        },
        {
          path: "/menu",
          element: <ProtectedRoute element={<Menu />} />,
        },
        {
          path: "/menu/:submenu",
          element: <ProtectedRoute element={<SubmenuItem />} />,
        },
        {
          path: "/users-management",
          element: <ProtectedRoute element={<UserManagement />} />,
        },
        {
          path: "/enquiry",
          element: <ProtectedRoute element={<Enquiry />} />,
        },
        {
          path: "/enquiry/:id",
          element: <ProtectedRoute element={<EnquiryDetails />} />,
        },
        {
          path: "/registered-users",
          element: <ProtectedRoute element={<RegisteredUsers />} />,
        },
        {
          path: "/registered-users/:id",
          element: <ProtectedRoute element={<RegisterUserDetails />} />,
        },
        {
          path: "/tickets",
          element: <ProtectedRoute element={<Tickets />} />,
        },
        {
          path: "/tickets/:id",
          element: <ProtectedRoute element={<TicketDetails />} />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

export default router;
