import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../context/ThemeContext";

const BurndownChart = () => {
  const { isDarkMode } = useTheme();
  const { burndown } = useSelector((state) => state.dashboard);
  const [timeframe, setTimeframe] = useState("30days");

  const chartData = useMemo(() => {
    switch (timeframe) {
      case "60days":
        return [
          { date: "Day 1", ideal: 60, actual: 60 },
          { date: "Day 15", ideal: 45, actual: 50 },
          { date: "Day 30", ideal: 30, actual: 40 },
          { date: "Day 45", ideal: 15, actual: 25 },
          { date: "Day 60", ideal: 0, actual: 10 },
        ];
      case "90days":
        return [
          { date: "Day 1", ideal: 90, actual: 90 },
          { date: "Day 30", ideal: 60, actual: 75 },
          { date: "Day 60", ideal: 30, actual: 50 },
          { date: "Day 90", ideal: 0, actual: 20 },
        ];
      case "30days":
      default:
        return (
          burndown || [
            { date: "Day 1", ideal: 30, actual: 30 },
            { date: "Day 10", ideal: 20, actual: 25 },
            { date: "Day 20", ideal: 10, actual: 18 },
            { date: "Day 30", ideal: 0, actual: 8 },
          ]
        ); // fallback to Redux state or provide default
    }
  }, [timeframe, burndown]);

  const remainingTasks = chartData.length
    ? Math.max(0, chartData[0].ideal - chartData[chartData.length - 1].actual)
    : 0;

  const behindSchedule = chartData.length
    ? Math.max(
        0,
        chartData[chartData.length - 1].actual -
          chartData[chartData.length - 1].ideal
      )
    : 0;

  // Colors for dark and light mode
  const colors = {
    idealStroke: isDarkMode ? "#9CA3AF" : "#D1D5DB",
    idealFill: isDarkMode ? "rgba(75, 85, 99, 0.3)" : "#F3F4F6",
    actualStroke: isDarkMode ? "#60A5FA" : "#3B82F6",
    actualFill: isDarkMode ? "rgba(59, 130, 246, 0.2)" : "#EFF6FF",
    grid: isDarkMode ? "rgba(75, 85, 99, 0.3)" : "#F3F4F6",
    tooltip: isDarkMode ? "#374151" : "#FFFFFF",
    tooltipText: isDarkMode ? "#F3F4F6" : "#111827",
  };

  // Custom tooltip component with dark mode support
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={`p-3 rounded-lg shadow-md border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700 text-gray-100"
              : "bg-white border-gray-200 text-gray-800"
          }`}
        >
          <p className="font-medium">{label}</p>
          <p className={`${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
            Actual: {payload[1].value}
          </p>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Ideal: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`rounded-lg shadow-md transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <div
        className={`p-5 flex justify-between items-center border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h3
          className={`text-lg font-medium ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Burndown Chart
        </h3>
        <select
          className={`py-1 px-3 text-sm rounded-md focus:ring-2 focus:ring-offset-2 focus:outline-none ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500"
              : "bg-white border-gray-300 text-gray-700 focus:ring-blue-500"
          }`}
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="30days">Last 30 Days</option>
          <option value="60days">Last 60 Days</option>
          <option value="90days">Last 90 Days</option>
        </select>
      </div>
      <div className="p-5">
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: isDarkMode ? "#D1D5DB" : "#4B5563" }}
              stroke={isDarkMode ? "#6B7280" : "#9CA3AF"}
            />
            <YAxis
              tick={{ fontSize: 12, fill: isDarkMode ? "#D1D5DB" : "#4B5563" }}
              stroke={isDarkMode ? "#6B7280" : "#9CA3AF"}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                paddingTop: "10px",
                color: isDarkMode ? "#D1D5DB" : "#4B5563",
              }}
            />
            <Area
              type="monotone"
              dataKey="ideal"
              stroke={colors.idealStroke}
              fill={colors.idealFill}
              name="Ideal Burndown"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke={colors.actualStroke}
              fill={colors.actualFill}
              name="Actual Burndown"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div
          className={`mt-4 flex justify-between text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <span>
            <strong className={isDarkMode ? "text-gray-200" : "text-gray-900"}>
              Remaining:
            </strong>{" "}
            {remainingTasks} tasks
          </span>
          <span className={isDarkMode ? "text-yellow-400" : "text-yellow-600"}>
            Behind schedule by {behindSchedule} tasks
          </span>
        </div>
      </div>
    </div>
  );
};

export default BurndownChart;
