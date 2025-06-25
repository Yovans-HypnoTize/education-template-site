import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface DropDownMenuCardProps {
  item: any;
  handleToggleSubmenu: (value: string | null) => void;
}

const DropDownMenuCard: React.FC<DropDownMenuCardProps> = ({
  item,
  handleToggleSubmenu,
}) => {
  const navigate = useNavigate();

  return (
    <Box display="flex" gap={1} flexDirection="column" bgcolor="#fff">
      {item?.content?.map((section: any) => {
        const isActive = location.pathname.endsWith(
          `/${section.id.toLowerCase()}`
        );
        return (
          <Box key={section.title}>
            <Typography
              key={section.id}
              variant="body2"
              sx={{
                cursor: "pointer",
                fontWeight: "500",
                color: isActive ? "primary.main" : "#707070",
                "&:hover": { color: "primary.main" },
              }}
              onClick={() => {
                navigate(`${item.path}/${section.id}`);
                handleToggleSubmenu(null);
              }}
            >
              {section.title}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default DropDownMenuCard;
