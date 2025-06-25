import TopNav from "./Nav/TopNav";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { CardProvider } from "../context/AuthCardContext";
import { Box, Divider } from "@mui/material";
import whatsapp_icon from "../assets/whatsapp.png";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";


const whatsapp_icon_style = {
  position: "fixed",
  bottom: {xs:20,sm:32},
  left: { xs: 8,sm:15, md: 25 },
  zIndex: 9999,
  borderRadius: "50%",
  padding: 0.5,
  boxShadow: { xs: "none", md: 3 },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const goto_top_icon_style = {
  position: "fixed",
  bottom: { xs: "15%",sm:"17%", md: "17%",xl:"15%" },
  backgroundColor: "#000",
  left: { xs: 13, sm:20, md: 30 },
  zIndex: 9999,
  borderRadius: "50%",
  padding: 1,
  boxShadow: 1,
  border: "1px solid #000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "rgb(52, 113, 173)",
    border: "1px solid rgb(52, 113, 173)",
    transform: "translateY(-5px)",
  },
};

const PublicLayout = () => {
  return (
    <CardProvider>
      <TopNav />
      <Outlet />
      <Divider />
      <Footer />
      <Box
        className="float"
        sx={goto_top_icon_style}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUpwardIcon
          sx={{
            height: { xs: 15, md: 35 },
            width: { xs: 15, md: 35 },
            color: "#fff",
          }}
        />
      </Box>

      <Box
        component={"a"}
        href="https://wa.me/9360293602"
        className="float"
        target="_blank"
        rel="noopener noreferrer"
        sx={whatsapp_icon_style}
      >
        <Box
          component={"img"}
          sx={{ height: { xs: 35, md: 55 }, width: { xs: 35, md: 55 } }}
          src={whatsapp_icon}
          alt="Connect with me"
        />
      </Box>
    </CardProvider>
  );
};

export default PublicLayout;
