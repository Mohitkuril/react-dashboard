import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateResourcePercentages } from "../store/resourceSlice";

function ResourceAllocation() {
  const dispatch = useDispatch();
  const resources = useSelector((state) => state.resource.resources);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateResourcePercentages());
    }, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, [dispatch]);

  const roleColorMap = {
    "UX Designer": "bg-blue-500",
    "Frontend Dev": "bg-red-500",
    "Backend Dev": "bg-green-500",
    "Project Manager": "bg-yellow-500",
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-gray-700">Resource Allocation</h2>
      </div>

      <div className="space-y-4">
        {resources.map((resource) => (
          <div key={resource.id} className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
              <img
                src={resource.avatar}
                alt={resource.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium text-gray-800">
                    {resource.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {Math.round(resource.assignedPercentage)}% assigned
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-600">{resource.role}</div>
                  <div className="text-sm text-gray-500">
                    {Math.round(resource.capacityPercentage)}% capacity
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-gray-200 h-2 rounded-full">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    roleColorMap[resource.role]
                  }`}
                  style={{ width: `${resource.assignedPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <a href="#" className="text-blue-500 text-sm">
          View all resources →
        </a>
      </div>
    </div>
  );
}

export default ResourceAllocation;
