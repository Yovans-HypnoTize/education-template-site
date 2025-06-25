import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/material";

interface HeaderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  item: any;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ item, ...rest }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = useMemo(() => {
    if (item.content && Array.isArray(item.content)) {
      return item.content.some((subItem: any) =>
        location.pathname.includes(subItem.id)
      );
    }

    if (item.path && location.pathname.includes(item.path)) {
      return true;
    }

    return false;
  }, [item, location.pathname]);

  const gradientStyle = {
    background:
      "linear-gradient(115deg, #00B9F1 0%, #EC008B 56%, #FFCB05 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
  };
  return (
    <button
      {...rest}
      className="menu-label-button"
      style={{
        background: "none",
        border: "none",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        cursor: "pointer",
        padding: "8px 12px",
        backgroundColor: "transparent",
        fontSize: 18,
      }}
    >
      {item?.type === "directMenu" ? (
        <span
          style={
            location.pathname.endsWith(item.path)
              ? { ...gradientStyle, marginTop: "4px" }
              : { color: "#000", marginTop: "4px" }
          }
          onClick={() => {
            navigate(item.path);
          }}
        >
          {item.label}
        </span>
      ) : (
        <span style={isActive ? { ...gradientStyle } : { color: "#000" }}>
          {item.label}
        </span>
      )}
      {(item?.type === "dropDownMenu" || item?.type == "dropDown") && (
        <Box sx={{ mt: 0.6 }}>
          <KeyboardArrowDownIcon
            fontSize="inherit"
            sx={{ color: isActive ? "#EC008B" : "#000" }}
          />
        </Box>
      )}
    </button>
  );
};

export default HeaderButton;
