import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  moveTask,
  createCircularDependency,
  fixCircularDependency,
} from "../store/taskBoardSlice";

// Detect circular dependencies in task relationships
const detectCircularDependencies = (
  taskId,
  dependencyMap,
  visited = new Set(),
  path = []
) => {
  if (visited.has(taskId)) {
    const circularPath = [...path.slice(path.indexOf(taskId)), taskId];
    return { detected: true, path: circularPath };
  }

  if (!dependencyMap[taskId] || dependencyMap[taskId].length === 0) {
    return { detected: false };
  }

  visited.add(taskId);
  path.push(taskId);

  for (const dependencyId of dependencyMap[taskId]) {
    const result = detectCircularDependencies(
      dependencyId,
      dependencyMap,
      new Set(visited),
      [...path]
    );
    if (result.detected) {
      return result;
    }
  }

  visited.delete(taskId);
  return { detected: false };
};

// Task card with drag and drop support
const TaskCard = ({ task, onDragStart, dependencyMap, showDependencies }) => {
  const [showDetails, setShowDetails] = useState(false);
  const circularCheck = detectCircularDependencies(task.id, dependencyMap);
  const hasCircularDependency = circularCheck.detected;
  const dependencies = dependencyMap[task.id] || [];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className={`bg-white p-4 rounded-md border ${
        hasCircularDependency ? "border-red-500" : "border-gray-200"
      } shadow-sm mb-3 cursor-move`}
      draggable="true"
      onDragStart={(e) => onDragStart(e, task)}
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="flex justify-between items-start">
        <span
          className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
        {hasCircularDependency && (
          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
            Circular Dependency
          </span>
        )}
      </div>

      <h5 className="font-medium mt-2 text-gray-800">{task.title}</h5>

      {showDetails && (
        <>
          <p className="text-sm text-gray-500 mt-1">{task.description}</p>

          {showDependencies && dependencies.length > 0 && (
            <div className="mt-3">
              <h6 className="text-xs font-semibold text-gray-500">
                Dependencies:
              </h6>
              <div className="flex flex-wrap gap-1 mt-1">
                {dependencies.map((depId) => (
                  <span
                    key={depId}
                    className={`px-2 py-1 text-xs bg-gray-200 rounded-full ${
                      hasCircularDependency ? "border border-red-500" : ""
                    }`}
                  >
                    Task #{depId}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-3 flex justify-between items-center">
            <div className="flex items-center">
              <img
                className="h-6 w-6 rounded-full"
                src={task.assignee?.avatar || "https://via.placeholder.com/24"}
                alt={task.assignee?.name || "Unassigned"}
              />
              <span className="text-xs text-gray-500 ml-1">
                {task.assignee?.name || "Unassigned"}
              </span>
            </div>
            <span className="text-xs text-gray-400">
              {task.dueDate || "No date"}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

// Column component for task columns
const TaskColumn = ({
  column,
  tasks,
  onDrop,
  onDragOver,
  onDragStart,
  dependencyMap,
  showDependencies,
}) => {
  return (
    <div
      className="bg-gray-50 p-3 rounded-lg min-w-[280px] h-full"
      onDrop={(e) => onDrop(e, column.id)}
      onDragOver={onDragOver}
    >
      <h4 className="text-sm font-medium text-gray-700 mb-3 flex justify-between items-center">
        <span>{column.title}</span>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            column.id === "done"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {tasks.length}
        </span>
      </h4>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={onDragStart}
            dependencyMap={dependencyMap}
            showDependencies={showDependencies}
          />
        ))}
      </div>
    </div>
  );
};

const DraggableTaskBoard = () => {
  const dispatch = useDispatch();
  const {
    columns,
    tasks,
    dependencies: dependencyMap,
  } = useSelector((state) => state.taskBoard);
  const [draggedTask, setDraggedTask] = useState(null);
  const [showDependencies, setShowDependencies] = useState(true);

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    if (!draggedTask) return;
    dispatch(moveTask({ taskId: draggedTask.id, columnId }));
    setDraggedTask(null);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-5 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-700">Task Board</h3>
          <button
            onClick={() => setShowDependencies(!showDependencies)}
            className="text-sm text-blue-500"
          >
            Toggle Dependencies
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto p-5 space-x-5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {columns.map((column) => {
          const columnTasks = tasks.filter(
            (task) => task.columnId === column.id
          );
          return (
            <TaskColumn
              key={column.id}
              column={column}
              tasks={columnTasks}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragStart={handleDragStart}
              dependencyMap={dependencyMap}
              showDependencies={showDependencies}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DraggableTaskBoard;
