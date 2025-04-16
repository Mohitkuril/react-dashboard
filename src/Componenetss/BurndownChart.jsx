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

const BurndownChart = () => {
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
        return burndown; // fallback to Redux state
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

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Burndown Chart</h3>
        <select
          className="py-1 px-3 text-sm border-gray-300 rounded-md"
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
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: "8px" }} />
            <Legend />
            <Area
              type="monotone"
              dataKey="ideal"
              stroke="#D1D5DB"
              fill="#F3F4F6"
              name="Ideal Burndown"
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#3B82F6"
              fill="#EFF6FF"
              name="Actual Burndown"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>
            <strong className="text-gray-900">Remaining:</strong>{" "}
            {remainingTasks} tasks
          </span>
          <span className="text-yellow-500">
            Behind schedule by {behindSchedule} tasks
          </span>
        </div>
      </div>
    </div>
  );
};

export default BurndownChart;
