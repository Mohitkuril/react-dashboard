import { useState, useEffect } from "react";
import { useProject } from "../../context/ProjectContext";
import { useTheme } from "../../context/ThemeContext";

const GanttChart = () => {
  const { isDarkMode } = useTheme();
  const { ganttChart } = useProject();
  const [filterOpen, setFilterOpen] = useState(false);

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentDay = currentDate.getDate();

  const startDate = currentDate;

  const endDate = new Date(currentDate);
  endDate.setMonth(currentDate.getMonth() + 1); // Move one month forward

  const startMonthYear = `${currentMonth} ${currentDate.getFullYear()}`;
  const endMonthYear = `${endDate.toLocaleString("default", {
    month: "long",
  })} ${endDate.getFullYear()}`;

  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const weekWidth = 100 / weeks.length;

  const totalDays = 28;
  const dayWidth = 100 / totalDays;

  const daysSinceStart = Math.floor(
    (currentDate - startDate) / (1000 * 3600 * 24)
  );
  const currentWeek = Math.floor(daysSinceStart / 7); // Week number (0 = Week 1, 1 = Week 2, etc.)

  return (
    <div
      className={`rounded-lg shadow ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
    >
      <div
        className={`p-5 ${
          isDarkMode ? "border-b border-gray-700" : "border-b border-gray-200"
        }`}
      >
        <div className="flex justify-between items-center">
          <h3
            className={`text-lg  leading-6 font-medium ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Project Timeline
          </h3>
          <div className="flex space-x-2">
            <button
              type="button"
              className={`inline-flex cursor-pointer items-center px-3 py-1 border text-sm font-medium rounded-md ${
                isDarkMode
                  ? "border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600"
                  : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
              }`}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <i className="ri-filter-3-line mr-2"></i>
              Filter
            </button>
            <button
              type="button"
              className={`inline-flex cursor-pointer items-center px-3 py-1 border text-sm font-medium rounded-md ${
                isDarkMode
                  ? "border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600"
                  : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
              }`}
            >
              <i className="ri-calendar-line mr-2"></i>
              Today
            </button>
          </div>
        </div>
      </div>

      <div className="px-2 py-4 overflow-x-auto">
        <div className="inline-block min-w-full">
          <div
            className={`flex pb-2 ${
              isDarkMode
                ? "border-b border-gray-700"
                : "border-b border-gray-200"
            }`}
          >
            <div className="w-60 flex-shrink-0 pr-4">
              <div className="h-8 flex items-center justify-start px-2">
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Task
                </span>
              </div>
            </div>

            <div className="flex flex-1">
              <div className="flex" style={{ minWidth: "840px" }}>
                {weeks.map((week, index) => (
                  <div
                    key={index}
                    className={`
                      ${
                        isDarkMode
                          ? "border-r border-gray-700"
                          : "border-r border-gray-200"
                      } 
                      flex-1 
                      ${index === weeks.length - 1 ? "border-r-0" : ""} 
                      ${
                        index === currentWeek
                          ? isDarkMode
                            ? "bg-blue-900"
                            : "bg-blue-200"
                          : ""
                      }
                    `}
                  >
                    <div className="h-8 flex items-center justify-center">
                      <span
                        className={`text-xs font-medium ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {week}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            {ganttChart.map((task) => (
              <div
                key={task.id}
                className={`flex ${
                  isDarkMode
                    ? "border-b border-gray-800 hover:bg-gray-750"
                    : "border-b border-gray-100 hover:bg-gray-50"
                }`}
              >
                <div className="w-60 flex-shrink-0 pr-4 py-3 px-2">
                  <div className="flex items-center">
                    <i
                      className={`ri-arrow-right-s-line mr-1 ${
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    ></i>
                    <span
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-900"
                      }`}
                    >
                      {task.task}
                    </span>
                  </div>
                </div>
                <div
                  className="flex flex-1 relative items-center"
                  style={{ minWidth: "840px" }}
                >
                  <div className="absolute inset-0 flex items-center">
                    <div
                      className="gantt-bar opacity-80 rounded-md"
                      style={{
                        marginLeft: `${task.startDay * dayWidth}%`,
                        width: `${task.duration * dayWidth}%`,
                        backgroundColor: task.color,
                        height: "22px",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`px-5 py-3 flex justify-between items-center ${
          isDarkMode ? "border-t border-gray-700" : "border-t border-gray-200"
        }`}
      >
        <div
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <span className="font-medium">Start Date:</span> {startMonthYear}{" "}
          {currentDay}
        </div>
        <div
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <span className="font-medium">End Date:</span> {endMonthYear}{" "}
          {endDate.getDate()}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
