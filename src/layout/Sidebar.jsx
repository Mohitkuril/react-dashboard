// src/components/Sidebar.jsx
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useProject } from "../context/ProjectContext";

const Sidebar = () => {
  const { navigation } = useProject(); // Still using context for navigation
  const { isDarkMode } = useTheme();

  const [activeItem, setActiveItem] = useState("dashboard");

  // 🔥 Get teamName from Redux

  const handleNavClick = (id) => {
    setActiveItem(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div
          className={`flex flex-col h-0 flex-1 border-r ${
            isDarkMode
              ? "bg-gray-900 text-gray-100 border-gray-700"
              : "bg-white text-gray-800 border-gray-200"
          }`}
        >
          <div className="flex items-center p-4">
            <div
              className={`flex-shrink-0 flex items-center ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-2 text-lg font-semibold">Dashboard</span>
            </div>
          </div>
          {/* Navigation Links */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href="#"
                  onClick={() => handleNavClick(item.id)}
                  className={`${
                    activeItem === item.id
                      ? isDarkMode
                        ? "bg-blue-900 bg-opacity-40 text-blue-400 hover:bg-opacity-50"
                        : "bg-blue-50 bg-opacity-80 text-blue-600 hover:bg-opacity-100"
                      : isDarkMode
                      ? "text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <i
                    className={`${item.icon} ${
                      activeItem === item.id
                        ? isDarkMode
                          ? "text-blue-400"
                          : "text-blue-600"
                        : isDarkMode
                        ? "text-gray-400 group-hover:text-gray-300"
                        : "text-gray-400 group-hover:text-gray-500"
                    } mr-3 text-lg`}
                  ></i>
                  {item.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Team Name at the bottom */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
