import { NavLink } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import EdumaatLogo from "../assets/Edumaat-Logo.png";
import dashboardIcon from "../assets/icons/dashboardLogo.png";
import menuIcon from "../assets/icons/menu-icon.png";
import bannerIcon from "../assets/icons/banner-icon.png";
import usersIcon from "../assets/icons/users-icon.png";
import userManagementIcon from "../assets/icons/user-management.png";
import roleManagementIcon from "../assets/icons/role-management.png";
import ticketIcon from "../assets/icons/ticket-icon.png";

const navItems = [
  {
    path: "/",
    label: "Dashboard",
    icon: <img src={dashboardIcon} alt="dashboard" />,
  },
  // { path: "/menu", label: "Menu", icon: <img src={menuIcon} alt="menu" /> },
  // {
  //   path: "/banner",
  //   label: "Ad Banners(10)",
  //   icon: <img src={bannerIcon} alt="banners" />,
  // },
  // {
  //   path: "/role-management",
  //   label: "Role management",
  //   icon: <img src={roleManagementIcon} alt="Role management" />,
  // },
  // {
  //   path: "/users-management",
  //   label: "User management",
  //   icon: <img src={userManagementIcon} alt="User management" />,
  // },
  {
path:"/enquiry"
,label:"Enquiry",
icon: <img src={userManagementIcon} alt="Enquiry" />,
  },
  {
    path: "/registered-users",
    label: "Registered users",
    icon: <img src={usersIcon} alt="Registered users" />,
  },
  
  {
    path: "/tickets",
    label: "Tickets",
    icon: <img src={ticketIcon} alt="tickets" />,
  },
  // {
  //   path: "/settings",
  //   label: "Settings",
  //   icon: <SettingsIcon key={"settings"} />,
  // },
];

const Sidebar = () => {
  return (
    <div className="w-[300px] border-r border-gray-200 p-2 bg-[#0E1A28]">
      <div className="flex justify-start space-x-2 mb-8 ">
        <img
          src={EdumaatLogo}
          alt="random logo"
          className="w-20 h-20 pt-3 mb-4 ml-3"
        />
      </div>

      <nav>
        <ul className="space-y-2">
          {navItems.map(({ path, label, icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium 
                  ${
                    isActive
                      ? "bg-gray-700 text-white "
                      : "text-white opacity-80  hover:opacity-55"
                  }`
                }
              >
                {icon}
                <span className="ml-2">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
