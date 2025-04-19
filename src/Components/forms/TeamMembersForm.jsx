// src/components/TeamMembersForm.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useTheme } from "../../context/ThemeContext";
import {
  setResources,
  setDashboardStats,
  addFormMember,
  removeFormMember,
  updateFormMember,
  addFormTask,
  updateFormTask,
  removeFormTask,
  addFormBurndownEntry,
  updateFormBurndownEntry,
  removeFormBurndownEntry,
  resetFormToDefault,
  setFormSubmitted,
  setTeamSize,
} from "../../store/dashboardSlice";

export default function TeamMembersForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  // Get state from Redux store
  const members = useSelector((state) => state.dashboard.formMembers);
  const burndown = useSelector((state) => state.dashboard.formBurndown);
  const isFormSubmitted = useSelector(
    (state) => state.dashboard.isFormSubmitted
  );

  // If the form was previously submitted and we're returning to it, check if we need to navigate back to dashboard
  useEffect(() => {
    if (isFormSubmitted) {
      navigate("/dashboard");
    }
  }, [isFormSubmitted, navigate]);

  const handleMemberChange = (index, field, value) => {
    dispatch(updateFormMember({ index, field, value }));
  };

  const handleTaskChange = (memberIndex, taskIndex, field, value) => {
    dispatch(updateFormTask({ memberIndex, taskIndex, field, value }));
  };

  const handleAddMember = () => {
    dispatch(addFormMember());
  };

  const handleRemoveMember = (index) => {
    dispatch(removeFormMember(index));
  };

  const handleAddTask = (memberIndex) => {
    dispatch(addFormTask(memberIndex));
  };

  const handleRemoveTask = (memberIndex, taskIndex) => {
    dispatch(removeFormTask({ memberIndex, taskIndex }));
  };

  const handleBurndownChange = (index, field, value) => {
    dispatch(updateFormBurndownEntry({ index, field, value }));
  };

  const handleAddBurndownEntry = () => {
    dispatch(addFormBurndownEntry());
  };

  const handleRemoveBurndownEntry = (index) => {
    dispatch(removeFormBurndownEntry(index));
  };

  const handleResetToDefault = () => {
    dispatch(resetFormToDefault());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const resources = members.map((m, i) => ({
      id: i + 1,
      name: m.name,
      role: m.role,
      avatar: "/avatars/default.png",
      assignedPercentage: m.assignedPercentage,
      capacityPercentage: m.capacityPercentage,
    }));

    const tasks = members.flatMap((m) =>
      m.tasks.map((t) => ({
        id: nanoid(),
        title: t.title,
        description: t.description,
        priority: t.priority,
        columnId: "todo",
        assignee: { name: m.name, avatar: "/avatars/default.png" },
        dueDate: t.dueDate,
      }))
    );

    const finalResources =
      resources.length > 0 && resources[0].name ? resources : [];
    const finalTasks = tasks.length > 0 && tasks[0].title ? tasks : [];

    // ✅ Save team size
    dispatch(setTeamSize(finalResources.length));

    dispatch(setResources(finalResources));
    dispatch(
      setDashboardStats({
        burndown,
        completedTasks: { done: 1, total: finalTasks.length },
        hoursSpent: { total: 120, thisWeek: 32 },
        budget: { spent: 15000, total: 50000 },
      })
    );

    dispatch(setFormSubmitted(true));
    navigate("/dashboard");
  };

  return (
    <div
      className={`max-w-4xl mx-auto ${
        isDarkMode ? "text-white" : "text-gray-800"
      }`}
    >
      {/* Team Members Summary */}
      {members.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2 justify-end">
          {members.map((member, idx) => (
            <div
              key={idx}
              className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                isDarkMode
                  ? "bg-gray-700 text-gray-200"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              <span>{member.name || `Member ${idx + 1}`}</span>
              <button
                type="button"
                onClick={() => handleRemoveMember(idx)}
                className={`ml-1 rounded-full h-4 w-4 flex items-center justify-center text-xs ${
                  isDarkMode
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-blue-200 hover:bg-blue-300"
                }`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2
          className={`text-xl font-bold ${
            isDarkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Team & Task Setup
        </h2>
        <button
          type="button"
          onClick={handleResetToDefault}
          className={`text-sm px-3 py-1 rounded ${
            isDarkMode
              ? "bg-purple-900 text-purple-200 hover:bg-purple-800"
              : "bg-purple-100 text-purple-700 hover:bg-purple-200"
          }`}
        >
          Load Sample Data
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map((member, mIndex) => (
            <div
              key={mIndex}
              className={`p-4 border rounded-xl shadow-md space-y-4 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center border-b pb-2 mb-3">
                <h3 className="text-lg font-semibold">
                  Team Member {mIndex + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => handleRemoveMember(mIndex)}
                  className={`px-2 py-1 rounded-md text-sm ${
                    isDarkMode
                      ? "bg-red-900 text-red-200 hover:bg-red-800"
                      : "bg-red-100 text-red-600 hover:bg-red-200"
                  }`}
                  disabled={members.length <= 1}
                >
                  Remove
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={member.name}
                    onChange={(e) =>
                      handleMemberChange(mIndex, "name", e.target.value)
                    }
                    className={`w-full px-3 py-2 rounded-md ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <input
                    type="text"
                    placeholder="Role"
                    value={member.role}
                    onChange={(e) =>
                      handleMemberChange(mIndex, "role", e.target.value)
                    }
                    className={`w-full px-3 py-2 rounded-md ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                    }`}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Assigned %
                    </label>
                    <input
                      type="number"
                      placeholder="Assigned %"
                      value={member.assignedPercentage}
                      onChange={(e) =>
                        handleMemberChange(
                          mIndex,
                          "assignedPercentage",
                          +e.target.value
                        )
                      }
                      className={`w-full px-3 py-2 rounded-md ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                          : "bg-gray-50 border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                      }`}
                      min={0}
                      max={100}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Capacity %
                    </label>
                    <input
                      type="number"
                      placeholder="Capacity %"
                      value={member.capacityPercentage}
                      onChange={(e) =>
                        handleMemberChange(
                          mIndex,
                          "capacityPercentage",
                          +e.target.value
                        )
                      }
                      className={`w-full px-3 py-2 rounded-md ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                          : "bg-gray-50 border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                      }`}
                      min={0}
                      max={100}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Tasks</h4>
                    <button
                      type="button"
                      onClick={() => handleAddTask(mIndex)}
                      className={`text-sm px-2 py-1 rounded ${
                        isDarkMode
                          ? "bg-blue-900 text-blue-200 hover:bg-blue-800"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      }`}
                    >
                      + Add Task
                    </button>
                  </div>

                  <div className="space-y-3">
                    {member.tasks.map((task, tIndex) => (
                      <div
                        key={tIndex}
                        className={`border rounded-md p-3 ${
                          isDarkMode
                            ? "border-gray-700 bg-gray-700/50"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            Task {tIndex + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTask(mIndex, tIndex)}
                            className={`text-xs px-2 py-0.5 rounded ${
                              isDarkMode
                                ? "bg-red-900/70 text-red-200 hover:bg-red-800"
                                : "bg-red-100 text-red-600 hover:bg-red-200"
                            }`}
                            disabled={member.tasks.length <= 1}
                          >
                            Remove
                          </button>
                        </div>

                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Title"
                            value={task.title}
                            onChange={(e) =>
                              handleTaskChange(
                                mIndex,
                                tIndex,
                                "title",
                                e.target.value
                              )
                            }
                            className={`w-full px-3 py-2 rounded-md text-sm ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                                : "bg-white border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                            }`}
                            required
                          />

                          <textarea
                            placeholder="Description"
                            value={task.description}
                            onChange={(e) =>
                              handleTaskChange(
                                mIndex,
                                tIndex,
                                "description",
                                e.target.value
                              )
                            }
                            className={`w-full px-3 py-2 rounded-md text-sm ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                                : "bg-white border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                            }`}
                            rows={2}
                          />

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs mb-1">
                                Priority
                              </label>
                              <select
                                value={task.priority}
                                onChange={(e) =>
                                  handleTaskChange(
                                    mIndex,
                                    tIndex,
                                    "priority",
                                    e.target.value
                                  )
                                }
                                className={`w-full px-3 py-1.5 rounded-md text-sm ${
                                  isDarkMode
                                    ? "bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                                    : "bg-white border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                                }`}
                              >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs mb-1">
                                Due Date
                              </label>
                              <input
                                type="date"
                                value={task.dueDate}
                                onChange={(e) =>
                                  handleTaskChange(
                                    mIndex,
                                    tIndex,
                                    "dueDate",
                                    e.target.value
                                  )
                                }
                                className={`w-full px-3 py-1.5 rounded-md text-sm ${
                                  isDarkMode
                                    ? "bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                                    : "bg-white border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleAddMember}
            className={`px-4 py-2 rounded-lg ${
              isDarkMode
                ? "bg-green-800 text-green-100 hover:bg-green-700"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            + Add Team Member
          </button>
        </div>

        <div
          className={`mt-8 border-t pt-6 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Burndown Chart Data</h3>
            <button
              type="button"
              onClick={handleAddBurndownEntry}
              className={`text-sm px-2 py-1 rounded ${
                isDarkMode
                  ? "bg-blue-900 text-blue-200 hover:bg-blue-800"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              + Add Day
            </button>
          </div>

          <div className="space-y-2">
            {burndown.map((entry, index) => (
              <div
                key={index}
                className={`grid grid-cols-7 gap-2 items-center ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="col-span-2">
                  <label className="block text-xs mb-1">Day</label>
                  <input
                    type="text"
                    placeholder="Day"
                    value={entry.date}
                    onChange={(e) =>
                      handleBurndownChange(index, "date", e.target.value)
                    }
                    className={`w-full px-3 py-2 rounded-md text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                    }`}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs mb-1">Ideal</label>
                  <input
                    type="number"
                    placeholder="Ideal"
                    value={entry.ideal}
                    onChange={(e) =>
                      handleBurndownChange(index, "ideal", +e.target.value)
                    }
                    className={`w-full px-3 py-2 rounded-md text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                    }`}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs mb-1">Actual</label>
                  <input
                    type="number"
                    placeholder="Actual"
                    value={entry.actual}
                    onChange={(e) =>
                      handleBurndownChange(index, "actual", +e.target.value)
                    }
                    className={`w-full px-3 py-2 rounded-md text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 focus:ring-blue-600 focus:border-blue-600"
                    }`}
                  />
                </div>
                <div className="col-span-1 flex items-end justify-center pb-1">
                  <button
                    type="button"
                    onClick={() => handleRemoveBurndownEntry(index)}
                    disabled={burndown.length <= 1}
                    className={`px-2 py-1 rounded-md text-sm ${
                      burndown.length <= 1
                        ? isDarkMode
                          ? "bg-gray-700 text-gray-500"
                          : "bg-gray-200 text-gray-400"
                        : isDarkMode
                        ? "bg-red-900 text-red-200 hover:bg-red-800"
                        : "bg-red-100 text-red-600 hover:bg-red-200"
                    }`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className={`px-6 py-2 rounded-lg font-medium ${
              isDarkMode
                ? "bg-blue-700 text-white hover:bg-blue-600"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Save & Go to Dashboard
          </button>
        </div>
      </form>
    </div>
  );
}
