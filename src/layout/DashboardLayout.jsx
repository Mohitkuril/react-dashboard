import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { useTheme } from "../context/ThemeContext";

const DashboardLayout = ({ children }) => {
  const { isDarkMode } = useTheme();

  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        showMobileSidebar &&
        !e.target.closest(".sidebar") &&
        !e.target.closest(".menu-button")
      ) {
        setShowMobileSidebar(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [showMobileSidebar]);

  return (
    <div className="flex h-screen overflow-hidden">
      {showMobileSidebar && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-gray-600 bg-opacity-75"></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white sidebar">
            <Sidebar />
          </div>
        </div>
      )}

      <Sidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <TopBar toggleSidebar={toggleMobileSidebar} />
        <main
          className={`flex-1 relative overflow-y-auto focus:outline-none bg-gray-50 p-6 ${
            isDarkMode ? "dark:bg-gray-900 scrollbar-dark" : "scrollbar-light"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
