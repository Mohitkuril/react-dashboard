import { useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";

function StatusCards() {
  const { isDarkMode } = useTheme();

  const teamSize = useSelector((state) => state.dashboard.teamSize);

  // Dummy fallback data (declared inside component as requested)
  const fallback = {
    completedTasks: { done: 24, total: 40 },
    hoursSpent: { total: 148, thisWeek: 32 },
    teamMembers: new Array(8).fill({}),
    budget: { spent: 24500, total: 35000 },
  };

  const {
    completedTasks = fallback.completedTasks,
    hoursSpent = fallback.hoursSpent,
    teamMembers = fallback.teamMembers,
    budget = fallback.budget,
  } = useSelector((state) => state.dashboard);

  // Use fallback only if completedTasks.total is not a valid number
  const hasRealData = completedTasks?.total > 0;

  const data = hasRealData
    ? { completedTasks, hoursSpent, teamMembers, budget }
    : fallback;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Completed Tasks */}
      <Card
        title="Completed Tasks"
        icon="check"
        color="blue"
        value={`${data.completedTasks.done} / ${data.completedTasks.total}`}
        percent={
          (data.completedTasks.done / data.completedTasks.total) * 100 || 0
        }
        footer={`${Math.round(
          (data.completedTasks.done / data.completedTasks.total) * 100 || 0
        )}%`}
        footerText="View all"
        isDarkMode={isDarkMode}
      />

      {/* Hours Spent */}
      <Card
        title="Hours Spent"
        icon="clock"
        color="blue"
        value={`${data.hoursSpent.total}h`}
        isDarkMode={isDarkMode}
        extra={`This Week: ${data.hoursSpent.thisWeek}h`}
        footerText="View details"
        showProgress={false}
      />

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
          <div className="text-2xl font-bold">
            {teamSize || fallback.teamMembers.length}
          </div>
          <div className="mt-3 flex -space-x-2">
            {new Array(Math.min(teamSize || 3, 3)).fill(0).map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full ${
                  isDarkMode
                    ? "bg-gray-600 border-gray-700"
                    : "bg-gray-400 border-white"
                } border-2`}
              ></div>
            ))}
            {(teamSize || fallback.teamMembers.length) > 3 && (
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-800 text-gray-200"
                    : "bg-gray-600 border-white text-white"
                } border-2`}
              >
                +{(teamSize || fallback.teamMembers.length) - 3}
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
      <Card
        title="Budget Spent"
        icon="dollar"
        color="yellow"
        value={`$${data.budget.spent.toLocaleString()}`}
        percent={(data.budget.spent / data.budget.total) * 100 || 0}
        footer={`$${data.budget.total.toLocaleString()} total`}
        footerText={`${Math.round(
          (data.budget.spent / data.budget.total) * 100 || 0
        )}%`}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

function Card({
  title,
  icon,
  color,
  value,
  percent,
  footer,
  footerText,
  extra,
  isDarkMode,
  showProgress = true,
}) {
  const icons = {
    check: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    ),
    clock: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    dollar: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  };

  return (
    <div
      className={`p-5 rounded-xl shadow-md transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <div className="flex items-center space-x-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isDarkMode ? `bg-${color}-900` : `bg-${color}-100`
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${
              isDarkMode ? `text-${color}-400` : `text-${color}-600`
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {icons[icon]}
          </svg>
        </div>
        <span className={isDarkMode ? "text-gray-300" : "text-gray-500"}>
          {title}
        </span>
      </div>
      <div className="mt-5">
        <div className="text-2xl font-bold">{value}</div>
        {extra && (
          <div
            className={`mt-3 text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {extra}
          </div>
        )}
        {showProgress && (
          <div
            className={`mt-3 h-2 rounded-full ${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <div
              className={`h-2 rounded-full ${
                isDarkMode ? `bg-${color}-500` : `bg-${color}-600`
              }`}
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        )}
        <div className="mt-3 flex justify-between text-sm">
          <span
            className={`${
              isDarkMode ? `text-${color}-400` : `text-${color}-600`
            }`}
          >
            {footerText}
          </span>
          <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
            {footer}
          </span>
        </div>
      </div>
    </div>
  );
}

export default StatusCards;
