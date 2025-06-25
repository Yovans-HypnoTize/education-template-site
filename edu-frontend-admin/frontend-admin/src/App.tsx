import { ToastContainer } from "react-toastify";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRouter";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./layout/theme";
import BackDrop from "./components/BackDrop";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BackDrop />
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ThemeProvider>
  );
}

export default App;
