import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addTeamMember, setTeamName } from "../store/teamSlice"; // ✅ import setTeamName
import FormLayout from "../layout/FormLayout";
import { useTheme } from "../context/ThemeContext";

const CreateTeamForm = () => {
  const [name, setName] = useState("");
  const [skipToDashboard, setSkipToDashboard] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (skipToDashboard) {
      navigate("/dashboard");
    } else if (name) {
      // ✅ Save to Redux
      dispatch(setTeamName(name));
      dispatch(addTeamMember({ id: Date.now(), name }));

      // ✅ Save to sessionStorage
      sessionStorage.setItem("teamName", name);

      setName("");
      navigate("/team-members");
    }
  };

  const formFields = [
    {
      id: "name",
      label: "Team Name",
      type: "text",
      value: name,
      onChange: (e) => setName(e.target.value),
      placeholder: "Enter team name",
      required: true,
      disabled: skipToDashboard,
    },
  ];

  return (
    <div
      className={`h-[90vh] flex items-center justify-center ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } px-8 py-16`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-lg shadow-lg ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <FormLayout
          title="Create Team"
          subtitle="Add team members to your project or skip to dashboard"
          formFields={formFields}
          buttonLabel={skipToDashboard ? "Go to Dashboard" : "Add Team Member"}
          onSubmit={handleSubmit}
        />

        <div className="mt-6 text-sm flex items-center justify-center">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              checked={skipToDashboard}
              onChange={() => setSkipToDashboard(!skipToDashboard)}
            />
            <span>
              Skip creating team name and go directly to{" "}
              <Link
                to="/dashboard"
                className="font-medium text-blue-500 hover:underline"
              >
                Dashboard
              </Link>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamForm;
