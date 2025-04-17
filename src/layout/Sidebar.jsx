// src/components/Sidebar.jsx
import { useState } from "react";
import { useProject } from "../context/ProjectContext";
import { useTheme } from "../context/ThemeContext";

const Sidebar = () => {
  const { navigation, team } = useProject();
  const { isDarkMode } = useTheme();
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleNavClick = (id) => {
    setActiveItem(id);
    const element = document.getElementById(id); // Scroll to the corresponding component
    if (element) {
      element.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "start", // Align to the top of the screen
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
            {/* Team members section */}
            <div className="px-3 mt-6">
              <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Team
              </h2>
              <div className="flex flex-col space-y-2">
                {team.map((member, index) => (
                  <a
                    key={index}
                    href="#"
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 mr-2">
                      {member.initials || member.name[0]}
                    </span>
                    <span>{member.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
