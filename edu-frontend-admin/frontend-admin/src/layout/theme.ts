import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .Mui-disabled": {
            color: "black !important",
            "-webkit-text-fill-color": "black !important",
          },
        },
      }
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        placement: "top",
      },
      styleOverrides: {
        tooltip: {
          backgroundColor: "#1976d2",
        },
        arrow: {
          color: "#1976d2",
        },
      },
    },
  },
});

export default theme;
