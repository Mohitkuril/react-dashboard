// src/components/TaskBoard.jsx
import { useState } from 'react';

function TaskBoard() {
  const [tasks, setTasks] = useState({
    backlog: [
      { id: 1, title: 'Write unit tests', priority: 'low' }
    ],
    todo: [
      { id: 2, title: 'Implement frontend auth', priority: 'medium' }
    ],
    inProgress: [
      { id: 3, title: 'Create API endpoints', priority: 'high' }
    ],
    review: []
  });
  
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-gray-700">Task Management Board</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded">
            Hide Dependencies
          </button>
          <button className="px-3 py-1 text-sm text-red-600 border border-red-200 bg-red-50 rounded">
            Create Circular Dependency
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded">
            Fix Dependencies
          </button>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 mb-4">
        Drag and drop tasks between columns. Tasks with circular dependencies are highlighted in red.
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {/* Backlog Column */}
        <div className="bg-gray-50 p-3 rounded">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-700">Backlog</h3>
            <span className="bg-gray-200 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center text-xs">1</span>
          </div>
          
          <div className="space-y-2">
            {tasks.backlog.map(task => (
              <div key={task.id} className="bg-white p-3 rounded shadow-sm border-l-4 border-blue-300">
                <div className={`text-xs mb-1 ${
                  task.priority === 'low' ? 'text-blue-500' : 
                  task.priority === 'medium' ? 'text-yellow-500' : 
                  'text-red-500'
                }`}>
                  {task.priority}
                </div>
                <div className="text-gray-700">{task.title}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* To Do Column */}
        <div className="bg-gray-50 p-3 rounded">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-700">To Do</h3>
            <span className="bg-gray-200 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center text-xs">1</span>
          </div>
          
          <div className="space-y-2">
            {tasks.todo.map(task => (
              <div key={task.id} className="bg-white p-3 rounded shadow-sm border-l-4 border-yellow-300">
                <div className={`text-xs mb-1 ${
                  task.priority === 'low' ? 'text-blue-500' : 
                  task.priority === 'medium' ? 'text-yellow-500' : 
                  'text-red-500'
                }`}>
                  {task.priority}
                </div>
                <div className="text-gray-700">{task.title}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* In Progress Column */}
        <div className="bg-gray-50 p-3 rounded">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-700">In Progress</h3>
            <span className="bg-gray-200 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center text-xs">1</span>
          </div>
          
          <div className="space-y-2">
            {tasks.inProgress.map(task => (
              <div key={task.id} className="bg-white p-3 rounded shadow-sm border-l-4 border-red-300">
                <div className={`text-xs mb-1 ${
                  task.priority === 'low' ? 'text-blue-500' : 
                  task.priority === 'medium' ? 'text-yellow-500' : 
                  'text-red-500'
                }`}>
                  {task.priority}
                </div>
                <div className="text-gray-700">{task.title}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Review Column */}
        <div className="bg-gray-50 p-3 rounded">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-700">Review</h3>
            <span className="bg-gray-200 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center text-xs">0</span>
          </div>
          
          <div className="space-y-2">
            {/* Empty review column */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskBoard;