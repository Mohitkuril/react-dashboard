import { useState } from "react";
import { useProject } from "../context/ProjectContext"; // adjust path as needed

const Sidebar = () => {
  const { navigation, team } = useProject(); // 👈 make sure this is active
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleNavClick = (id) => {
    setActiveItem(id);
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-white border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-800">ProjectHub</h1>
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
                      ? "bg-primary bg-opacity-10 text-primary hover:bg-opacity-20"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <i
                    className={`${item.icon} ${
                      activeItem === item.id
                        ? "text-primary"
                        : "text-gray-400 group-hover:text-gray-500"
                    } mr-3 text-lg`}
                  ></i>
                  {item.title}
                </a>
              ))}
            </nav>

            {/* Team members section */}
            <div className="px-3 mt-6">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Team
              </h2>
              <div className="flex flex-col space-y-2">
                {team.map((member, index) => (
                  <a
                    key={index}
                    href="#"
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 mr-2">
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
