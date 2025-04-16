// src/components/GanttChart.jsx
import { useState, useEffect } from "react";
import { useProject } from "../context/ProjectContext";

const GanttChart = () => {
  const { ganttChart } = useProject();
  const [filterOpen, setFilterOpen] = useState(false);

  // Calculate current date and month
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentDay = currentDate.getDate();

  // Start Date: Current date
  const startDate = currentDate;

  // End Date: Same day next month
  const endDate = new Date(currentDate);
  endDate.setMonth(currentDate.getMonth() + 1); // Move one month forward

  // Display Month and Year dynamically
  const startMonthYear = `${currentMonth} ${currentDate.getFullYear()}`;
  const endMonthYear = `${endDate.toLocaleString("default", {
    month: "long",
  })} ${endDate.getFullYear()}`;

  // Weeks in the timeline
  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const weekWidth = 100 / weeks.length;

  // Total days in our chart (28 days / 4 weeks)
  const totalDays = 28;
  const dayWidth = 100 / totalDays;

  // Calculate current week based on start date and current date
  const daysSinceStart = Math.floor(
    (currentDate - startDate) / (1000 * 3600 * 24)
  );
  const currentWeek = Math.floor(daysSinceStart / 7); // Week number (0 = Week 1, 1 = Week 2, etc.)

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-5 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Project Timeline
          </h3>
          <div className="flex space-x-2">
            <button
              type="button"
              className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <i className="ri-filter-3-line mr-2"></i>
              Filter
            </button>
            <button
              type="button"
              className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <i className="ri-calendar-line mr-2"></i>
              Today
            </button>
          </div>
        </div>
      </div>

      {/* Main Gantt Chart Layout */}
      <div className="px-2 py-4 overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="flex border-b border-gray-200 pb-2">
            {/* Task Names Column */}
            <div className="w-60 flex-shrink-0 pr-4">
              <div className="h-8 flex items-center justify-start px-2">
                <span className="text-sm font-medium text-gray-500">Task</span>
              </div>
            </div>

            {/* Weeks Column */}
            <div className="flex flex-1">
              <div className="flex" style={{ minWidth: "840px" }}>
                {weeks.map((week, index) => (
                  <div
                    key={index}
                    className={`border-r border-gray-200 flex-1 ${
                      index === weeks.length - 1 ? "border-r-0" : ""
                    } ${index === currentWeek ? "bg-blue-200" : ""}`} // Highlight the current week
                  >
                    <div className="h-8 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-500">
                        {week}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gantt Tasks */}
          <div>
            {ganttChart.map((task) => (
              <div
                key={task.id}
                className="flex border-b border-gray-100 hover:bg-gray-50"
              >
                <div className="w-60 flex-shrink-0 pr-4 py-3 px-2">
                  <div className="flex items-center">
                    <i className="ri-arrow-right-s-line text-gray-400 mr-1"></i>
                    <span className="text-sm font-medium text-gray-900">
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

      <div className="px-5 py-3 border-t border-gray-200 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <span className="font-medium">Start Date:</span> {startMonthYear}{" "}
          {currentDay}
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium">End Date:</span> {endMonthYear}{" "}
          {endDate.getDate()}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
