import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Header from "./Header";

const Layout = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Use the theme context

  return (
    <div
      className={
        isDarkMode
          ? "min-h-screen bg-gray-900 text-white"
          : "min-h-screen bg-white text-gray-800"
      }
    >
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
