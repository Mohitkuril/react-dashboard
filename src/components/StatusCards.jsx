import { useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";

function StatusCards() {
  const { isDarkMode } = useTheme();
  const { completedTasks, hoursSpent, teamMembers, budget } = useSelector(
    (state) => state.dashboard
  );

  // Check if any actual data is present or fallback
  const hasRealData = completedTasks?.total > 0;

  // Dummy fallback
  const fallback = {
    completedTasks: { done: 24, total: 40 },
    hoursSpent: { total: 148, thisWeek: 32 },
    teamMembers: new Array(8).fill({}),
    budget: { spent: 24500, total: 35000 },
  };

  const data = hasRealData
    ? { completedTasks, hoursSpent, teamMembers, budget }
    : fallback;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Completed Tasks */}
      <div
        className={`p-5 rounded-xl shadow-md transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDarkMode ? "bg-blue-900" : "bg-blue-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <span className={isDarkMode ? "text-gray-300" : "text-gray-500"}>
            Completed Tasks
          </span>
        </div>
        <div className="mt-5">
          <div className="text-2xl font-bold">
            {data.completedTasks.done} / {data.completedTasks.total}
          </div>
          <div
            className={`mt-3 h-2 rounded-full ${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <div
              className={`h-2 rounded-full ${
                isDarkMode ? "bg-blue-500" : "bg-blue-600"
              }`}
              style={{
                width: `${
                  (data.completedTasks.done / data.completedTasks.total) * 100
                }%`,
              }}
            ></div>
          </div>
          <div className="mt-3 flex justify-between text-sm">
            <span className={isDarkMode ? "text-blue-400" : "text-blue-600"}>
              View all
            </span>
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
              {Math.round(
                (data.completedTasks.done / data.completedTasks.total) * 100
              )}
              %
            </span>
          </div>
        </div>
      </div>

      {/* Hours Spent */}
      <div
        className={`p-5 rounded-xl shadow-md transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDarkMode ? "bg-blue-900" : "bg-blue-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className={isDarkMode ? "text-gray-300" : "text-gray-500"}>
            Hours Spent
          </span>
        </div>
        <div className="mt-5">
          <div className="text-2xl font-bold">{data.hoursSpent.total}h</div>
          <div
            className={`mt-3 text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            This Week: {data.hoursSpent.thisWeek}h
          </div>
          <div
            className={`mt-2 text-sm ${
              isDarkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            View details
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div
        className={`p-5 rounded-xl shadow-md transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDarkMode ? "bg-green-900" : "bg-green-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${
                isDarkMode ? "text-green-400" : "text-green-600"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <span className={isDarkMode ? "text-gray-300" : "text-gray-500"}>
            Team Members
          </span>
        </div>
        <div className="mt-5">
          <div className="text-2xl font-bold">{data.teamMembers.length}</div>
          <div className="mt-3 flex -space-x-2">
            {data.teamMembers.slice(0, 3).map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full ${
                  isDarkMode
                    ? "bg-gray-600 border-gray-700"
                    : "bg-gray-400 border-white"
                } border-2`}
              ></div>
            ))}
            {data.teamMembers.length > 3 && (
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-800 text-gray-200"
                    : "bg-gray-600 border-white text-white"
                } border-2`}
              >
                +{data.teamMembers.length - 3}
              </div>
            )}
          </div>
          <div
            className={`mt-3 text-sm ${
              isDarkMode ? "text-green-400" : "text-green-600"
            }`}
          >
            Manage team
          </div>
        </div>
      </div>

      {/* Budget Spent */}
      <div
        className={`p-5 rounded-xl shadow-md transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDarkMode ? "bg-yellow-900" : "bg-yellow-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${
                isDarkMode ? "text-yellow-400" : "text-yellow-600"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className={isDarkMode ? "text-gray-300" : "text-gray-500"}>
            Budget Spent
          </span>
        </div>
        <div className="mt-5">
          <div className="text-2xl font-bold">
            ${data.budget.spent.toLocaleString()}
          </div>
          <div
            className={`mt-3 h-2 rounded-full ${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <div
              className={`h-2 rounded-full ${
                isDarkMode ? "bg-yellow-500" : "bg-yellow-500"
              }`}
              style={{
                width: `${(data.budget.spent / data.budget.total) * 100}%`,
              }}
            ></div>
          </div>
          <div className="mt-3 flex justify-between text-sm">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
              ${data.budget.total.toLocaleString()} total
            </span>
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
              {Math.round((data.budget.spent / data.budget.total) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusCards;
