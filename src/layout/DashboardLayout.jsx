import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const DashboardLayout = ({ children }) => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  // Close sidebar when clicking outside on mobile
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
      {/* Mobile sidebar */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-gray-600 bg-opacity-75"></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white sidebar">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Regular sidebar (hidden on mobile) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Pass toggleMobileSidebar to TopBar */}
        <TopBar toggleSidebar={toggleMobileSidebar} />

        {/* Main Content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
