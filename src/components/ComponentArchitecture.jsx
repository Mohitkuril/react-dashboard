// src/components/ComponentArchitecture.jsx
import { useState } from "react";

function ComponentArchitecture() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-gray-700">
          Round-Robin Component Architecture
        </h2>
        <button
          className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded"
          onClick={() => setShowInfo(!showInfo)}
        >
          {showInfo ? "Hide" : "Show"} Dev Info
        </button>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        This demo shows components running in a round-robin fashion based on
        priority. Components yield control after completing their work.
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="font-medium text-blue-700">High Priority Component</div>
        <div className="text-sm text-blue-500">Counter: 0</div>
        <div className="text-xs text-blue-400 mt-1">
          This component has high priority but yields control quickly
        </div>
      </div>
    </div>
  );
}

export default ComponentArchitecture;
