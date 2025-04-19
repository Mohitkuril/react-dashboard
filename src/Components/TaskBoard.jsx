import React from "react";

const TaskBoard = ({ tasks }) => {
  const groupedTasks = {
    "To Do": tasks.filter((task) => task.status === "To Do"),
    "In Progress": tasks.filter((task) => task.status === "In Progress"),
    Done: tasks.filter((task) => task.status === "Done"),
  };

  return (
    <div className="grid grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
      {["To Do", "In Progress", "Done"].map((status) => (
        <div
          key={status}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {status}
          </h3>
          {groupedTasks[status].map((task, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm"
            >
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                {task.taskName}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {task.assignee}
              </p>
              <p className="text-gray-500 dark:text-gray-300">{task.dueDate}</p>
              <span className="text-sm text-gray-500 dark:text-gray-300">
                {task.status}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
