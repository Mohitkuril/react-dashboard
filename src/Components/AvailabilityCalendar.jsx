import { useState, useEffect } from "react";
import { useProject } from "../context/ProjectContext";
import { useTheme } from "../context/ThemeContext";
import dayjs from "dayjs";

const AvailabilityCalendar = () => {
  const { isDarkMode } = useTheme();
  const { calendar, setCalendar } = useProject();

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [monthDays, setMonthDays] = useState([]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const buildCalendar = () => {
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");
    const startDay = startOfMonth.day(); // day index (0–6)
    const daysInMonth = endOfMonth.date();
    const totalCells = 42; // 6 weeks x 7 days

    const today = dayjs();

    let days = [];

    for (let i = 0; i < totalCells; i++) {
      const dayNum = i - startDay + 1;
      const thisDay = startOfMonth.add(dayNum - 1, "day");

      let dayInfo = {
        date: thisDay,
        isCurrentMonth: thisDay.month() === currentDate.month(),
        isToday: thisDay.isSame(today, "date"),
        events: [],
      };

      dayInfo.events =
        calendar?.events?.filter((event) =>
          event.days.includes(thisDay.date())
        ) || [];

      days.push(dayInfo);
    }

    setMonthDays(days);
  };

  useEffect(() => {
    buildCalendar();

    // Update context's month name
    setCalendar((prev) => ({
      ...prev,
      month: currentDate.format("MMMM YYYY"),
    }));
  }, [currentDate]);

  const handlePreviousMonth = () => {
    setCurrentDate((prev) => prev.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => prev.add(1, "month"));
  };

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
            className={`text-lg leading-6 font-medium ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Team Availability
          </h3>
          <div className="flex space-x-3 items-center">
            <button
              onClick={handlePreviousMonth}
              className={isDarkMode ? "text-white" : "text-gray-700"}
            >
              <i className="ri-arrow-left-s-line text-lg" />
            </button>
            <span
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {currentDate.format("MMMM YYYY")}
            </span>
            <button
              onClick={handleNextMonth}
              className={isDarkMode ? "text-white" : "text-gray-700"}
            >
              <i className="ri-arrow-right-s-line text-lg" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div
          className={`grid grid-cols-7 gap-px rounded-lg overflow-hidden ${
            isDarkMode ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className={
                isDarkMode
                  ? "bg-gray-800 py-2 text-center"
                  : "bg-gray-100 py-2 text-center"
              }
            >
              <span
                className={`text-xs font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {day}
              </span>
            </div>
          ))}

          {monthDays.map((day, idx) => (
            <div
              key={idx}
              className={`h-24 p-1 border ${
                isDarkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-100"
              } ${
                day.isToday ? (isDarkMode ? "bg-blue-900" : "bg-blue-50") : ""
              }`}
            >
              <span
                className={`text-xs ${
                  !day.isCurrentMonth
                    ? "text-gray-400"
                    : isDarkMode
                    ? "text-gray-100"
                    : "text-gray-900"
                } ${day.isToday ? "font-bold" : ""}`}
              >
                {day.date.date()}
              </span>

              <div className="mt-1 text-[10px]">
                {day.events.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-sm p-1 mb-1 text-white text-[10px]"
                    style={{ backgroundColor: event.color }}
                  >
                    {event.member}: {event.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <h4
            className={`text-sm font-medium mb-2 ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Team Members
          </h4>
          <div className="flex flex-wrap gap-2">
            {(calendar.team || []).map((member, index) => (
              <div
                key={index}
                className={`flex items-center px-3 py-1 rounded-full ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: member.color }}
                ></span>
                <span
                  className={`text-xs font-medium ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {member.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
