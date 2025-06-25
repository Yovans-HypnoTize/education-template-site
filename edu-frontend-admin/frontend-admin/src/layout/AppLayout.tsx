import Header from "./Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
// import Footer from "./Footer";

const AppLayout = () => {
  return (
    <div className="flex h-screen bg-[#F6F7F9]">
      <Sidebar />
      <main className="flex flex-col mx-6 overflow-auto w-full mb-8">
        <Header />
        <div className="overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
