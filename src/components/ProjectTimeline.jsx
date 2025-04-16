// src/components/ProjectTimeline.jsx (continued)
import { useState } from "react";

function ProjectTimeline() {
  const [filter, setFilter] = useState(null);

  const phases = [
    {
      id: 1,
      name: "Planning Phase",
      startWeek: 1,
      endWeek: 1.5,
      color: "bg-blue-400",
    },
    {
      id: 2,
      name: "Design Phase",
      startWeek: 1.5,
      endWeek: 2.8,
      color: "bg-yellow-400",
    },
    {
      id: 3,
      name: "Development Phase",
      startWeek: 2.5,
      endWeek: 3.8,
      color: "bg-green-400",
    },
    {
      id: 4,
      name: "Testing Phase",
      startWeek: 3.8,
      endWeek: 4.5,
      color: "bg-purple-400",
    },
    {
      id: 5,
      name: "Deployment",
      startWeek: 4.5,
      endWeek: 4.8,
      color: "bg-gray-400",
    },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-gray-700">Project Timeline</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded flex items-center">
            <span>Filter</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded">
            Today
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 w-1/5">
                Task
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Week 1 (July)
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Week 2
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Week 3
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Week 4
              </th>
            </tr>
          </thead>
          <tbody>
            {phases.map((phase) => (
              <tr key={phase.id}>
                <td className="px-4 py-3 text-gray-700 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  {phase.name}
                </td>
                <td className="px-4 py-3" colSpan={4}>
                  <div className="relative h-8">
                    <div
                      className={`absolute h-6 rounded-lg ${phase.color}`}
                      style={{
                        left: `${(phase.startWeek - 1) * 25}%`,
                        width: `${(phase.endWeek - phase.startWeek) * 25}%`,
                      }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between text-sm mt-4 text-gray-500">
        <div>Start Date: July 1, 2023</div>
        <div>End Date: August 15, 2023</div>
      </div>
    </div>
  );
}

export default ProjectTimeline;
