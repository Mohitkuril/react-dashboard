import { useState } from "react";

const TopBar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 md:hidden"
        onClick={toggleMobileMenu}
      >
        <i className="ri-menu-line text-xl"></i>
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex">
          <div className="w-full flex md:ml-0">
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <i className="ri-search-line text-gray-400 ml-4"></i>
              </div>
              <input
                id="search-field"
                className="block w-full h-full pl-10 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm border-none"
                placeholder="Search projects, tasks..."
              />
            </div>
          </div>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          {/* Notifications */}
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 relative">
            <i className="ri-notification-3-line text-xl"></i>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>

          {/* Profile dropdown */}
          <div className="ml-3 relative">
            <div>
              <button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User profile"
                />
                <span className="ml-2 text-gray-700 hidden md:block">
                  John Doe
                </span>
                <i className="ri-arrow-down-s-line ml-1 text-gray-400 hidden md:block"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
