import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import { setResources } from "../store/dashboardSlice"; // import action if needed

const dummyResources = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "UX Designer",
    avatar: "https://i.pravatar.cc/300?img=20",
    assignedPercentage: 34,
    capacityPercentage: 55,
  },
  {
    id: 2,
    name: "David Wilson",
    role: "Frontend Dev",
    avatar: "https://i.pravatar.cc/300?img=8",
    assignedPercentage: 89,
    capacityPercentage: 95,
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Backend Dev",
    avatar: "https://i.pravatar.cc/300?img=9",
    assignedPercentage: 45,
    capacityPercentage: 60,
  },
  {
    id: 4,
    name: "Sarah Davis",
    role: "Project Manager",
    avatar: "https://i.pravatar.cc/300?img=16",
    assignedPercentage: 30,
    capacityPercentage: 75,
  },
];

function ResourceAllocation() {
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();

  const reduxResources = useSelector((state) => state.dashboard.resources);
  const resources =
    reduxResources?.length > 0 ? reduxResources : dummyResources;

  // Optional: Update logic (disabled or dummy simulation for now)
  useEffect(() => {
    const interval = setInterval(() => {
      // Example: Dispatch some random updates only if reduxResources exist
      if (reduxResources?.length > 0) {
        const updated = reduxResources.map((r) => ({
          ...r,
          assignedPercentage: Math.min(
            100,
            Math.max(10, r.assignedPercentage + (Math.random() * 10 - 5))
          ),
          capacityPercentage: Math.min(
            100,
            Math.max(50, r.capacityPercentage + (Math.random() * 5 - 2))
          ),
        }));
        dispatch(setResources(updated));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [reduxResources, dispatch]);

  const roleColorMap = {
    "UX Designer": {
      light: "bg-blue-500",
      dark: "bg-blue-600",
    },
    "Frontend Dev": {
      light: "bg-red-500",
      dark: "bg-red-600",
    },
    "Backend Dev": {
      light: "bg-green-500",
      dark: "bg-green-600",
    },
    "Project Manager": {
      light: "bg-yellow-500",
      dark: "bg-yellow-600",
    },
  };

  return (
    <div
      className={`p-5 rounded-xl shadow-md transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`font-medium text-lg ${
            isDarkMode ? "text-gray-100" : "text-gray-700"
          }`}
        >
          Resource Allocation
        </h2>
      </div>

      <div className="space-y-5">
        {resources.map((resource) => (
          <div key={resource.id} className="flex items-center space-x-4">
            <div
              className={`w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 ${
                isDarkMode ? "border-gray-700" : "border-gray-100"
              }`}
            >
              {resource.avatar ? (
                <img
                  src={resource.avatar}
                  alt={resource.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center text-lg font-medium ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {resource.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-grow">
              <div className="flex justify-between">
                <div>
                  <div
                    className={`font-medium ${
                      isDarkMode ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    {resource.name}
                  </div>
                  <div
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {Math.round(resource.assignedPercentage)}% assigned
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={isDarkMode ? "text-gray-300" : "text-gray-600"}
                  >
                    {resource.role}
                  </div>
                  <div
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {Math.round(resource.capacityPercentage)}% capacity
                  </div>
                </div>
              </div>
              <div
                className={`mt-2 h-2 rounded-full ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    isDarkMode
                      ? roleColorMap[resource.role]?.dark
                      : roleColorMap[resource.role]?.light
                  }`}
                  style={{ width: `${resource.assignedPercentage}%` }}
                ></div>
              </div>
              {resource.assignedPercentage > resource.capacityPercentage && (
                <div
                  className={`mt-1 text-xs ${
                    isDarkMode ? "text-red-400" : "text-red-500"
                  }`}
                >
                  Overallocated by{" "}
                  {Math.round(
                    resource.assignedPercentage - resource.capacityPercentage
                  )}
                  %
                </div>
              )}
            </div>
          </div>
        ))}

        {resources.length === 0 && (
          <div
            className={`py-8 text-center ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No resources to display
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <a
          href="#"
          className={`inline-flex items-center space-x-1 font-medium ${
            isDarkMode
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-700"
          } transition-colors`}
        >
          <span>View all resources</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default ResourceAllocation;
