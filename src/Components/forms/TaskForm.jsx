import React, { useState } from "react";

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("To Do");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      taskName,
      assignee,
      dueDate,
      status,
    };
    onAddTask(newTask);
    setTaskName("");
    setAssignee("");
    setDueDate("");
    setStatus("To Do");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Add New Task
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
          Task Name
        </label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
          Assignee
        </label>
        <input
          type="text"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
          Due Date
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
