// src/layouts/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/Header";

const Layout = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Use the theme context

  return (
    <div
      className={
        isDarkMode
          ? "min-h-screen bg-gray-800 text-white"
          : "min-h-screen bg-white text-gray-800"
      }
    >
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <main className="p-4">
        <Outlet /> {/* Render page components */}
      </main>
    </div>
  );
};

export default Layout;
