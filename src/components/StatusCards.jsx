import { useSelector } from "react-redux";

function StatusCards() {
  const { completedTasks, hoursSpent, teamMembers, budget } = useSelector(
    (state) => state.dashboard
  );

  // Check if any actual data is present or fallback
  const hasRealData = completedTasks.total > 0;

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
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
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
          <span className="text-gray-500">Completed Tasks</span>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold">
            {data.completedTasks.done} / {data.completedTasks.total}
          </div>
          <div className="mt-2 bg-gray-200 h-2 rounded-full">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{
                width: `${
                  (data.completedTasks.done / data.completedTasks.total) * 100
                }%`,
              }}
            ></div>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-blue-500">View all</span>
            <span className="text-gray-500">
              {Math.round(
                (data.completedTasks.done / data.completedTasks.total) * 100
              )}
              %
            </span>
          </div>
        </div>
      </div>

      {/* Hours Spent */}
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
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
          <span className="text-gray-500">Hours Spent</span>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold">{data.hoursSpent.total}h</div>
          <div className="mt-2 text-gray-500 text-sm">
            This Week: {data.hoursSpent.thisWeek}h
          </div>
          <div className="mt-1 text-blue-500 text-sm">View details</div>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-600"
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
          <span className="text-gray-500">Team Members</span>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold">{data.teamMembers.length}</div>
          <div className="mt-2 flex -space-x-2">
            {data.teamMembers.slice(0, 3).map((_, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"
              ></div>
            ))}
            {data.teamMembers.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-white flex items-center justify-center text-white text-xs">
                +{data.teamMembers.length - 3}
              </div>
            )}
          </div>
          <div className="mt-2 text-green-500 text-sm">Manage team</div>
        </div>
      </div>

      {/* Budget Spent */}
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-600"
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
          <span className="text-gray-500">Budget Spent</span>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold">
            ${data.budget.spent.toLocaleString()}
          </div>
          <div className="mt-2 bg-gray-200 h-2 rounded-full">
            <div
              className="bg-yellow-500 h-2 rounded-full"
              style={{
                width: `${(data.budget.spent / data.budget.total) * 100}%`,
              }}
            ></div>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-gray-500">
              ${data.budget.total.toLocaleString()} total
            </span>
            <span className="text-gray-500">
              {Math.round((data.budget.spent / data.budget.total) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusCards;
