import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import notificationsIcon from "../assets/icons/header-notification-icon.png";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { GetProfile, LogoutAction, startLoading, stopLoading } from "../pages/auth/features/authSlice";
import { notifyError, notifySuccess } from "../utils/toast";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useAppSelector((state) => state.auth);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(startLoading());
    dispatch(LogoutAction())
      .then((res: any) => {
        if (res.type.includes("fulfilled")) {
          navigate("/login");
          localStorage.clear();
          notifySuccess("Logout successful");
        } else {
          console.log("Logout failed", res);
          notifyError(res?.payload?.message || "Logout failed");
        }
      })
      .finally(() => dispatch(stopLoading()));
  };

  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };
  useEffect(() => {
    dispatch(startLoading());
    dispatch(GetProfile()).finally(() => dispatch(stopLoading()));
  }, [dispatch]);

  return (
    <header className="flex items-center justify-end px-6 py-2 shadow-sm bg-[#fdfdfd]  mt-5 mb-3 rounded-xl shrink-0">
      <div className="flex items-center gap-4 text-gray-600">
        <IconButton onClick={handleClick} size="small" sx={{ 
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
         }}>
          <Avatar className="!bg-pink-500" src={user?.data?.profileImage }>
            {user?.data?.firstname?.charAt(0)?.toUpperCase() ?? "--"}
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleProfile}>
            <PersonOutlineIcon className="mr-2" fontSize="small" />
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
            <LogoutIcon className="mr-2" fontSize="small" />
            Logout
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
