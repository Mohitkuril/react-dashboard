// src/components/Sidebar.jsx
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import { useProject } from "../context/ProjectContext";

const Sidebar = () => {
  const { navigation } = useProject(); // Still using context for navigation
  const { isDarkMode } = useTheme();

  const [activeItem, setActiveItem] = useState("dashboard");

  // 🔥 Get teamName from Redux
  const reduxTeamName = useSelector((state) => state.team.teamName);

  // 💾 Store final team name here
  const [teamName, setTeamName] = useState("");

  // 🧠 Check Redux first, then sessionStorage
  useEffect(() => {
    if (reduxTeamName) {
      setTeamName(reduxTeamName);
    } else {
      const storedName = sessionStorage.getItem("teamName");
      if (storedName) {
        setTeamName(storedName);
      }
    }
  }, [reduxTeamName]);

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
          {teamName && (
            <div
              className={`px-4 py-4 text-sm font-medium  ${
                isDarkMode
                  ? "bg-gray-800 text-gray-300 opacity-80"
                  : "bg-gray-200 text-gray-600 opacity-80"
              }`}
            >
              <span>Team: {teamName}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
