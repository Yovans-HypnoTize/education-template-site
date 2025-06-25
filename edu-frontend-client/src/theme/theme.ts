import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
    // fontFamily: "'Fredoka', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Poppins', sans-serif",
          // fontFamily: "'Fredoka', sans-serif",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          fontFamily: "'Poppins', sans-serif",
          // fontFamily: "'Fredoka', sans-serif",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: "'Poppins', sans-serif",
          // fontFamily: "'Fredoka', sans-serif",
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
