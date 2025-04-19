import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const NotFoundPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="text-center">
        <h1 className="text-9xl font-extrabold tracking-tight">404</h1>
        <p className="text-xl mt-4 font-semibold">Page Not Found</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-lg"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
