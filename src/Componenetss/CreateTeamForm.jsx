import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTeamMember } from "../store/teamSlice";
import FormLayout from "../layout/FormLayout"; // Import FormLayout

const CreateTeamForm = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      // Add team member to Redux store
      dispatch(addTeamMember({ id: Date.now(), name }));
      setName(""); // Reset input field

      // Redirect to Team Members page to add more details
      navigate("/team-members");
    }
  };

  const formFields = [
    {
      id: "name",
      label: "Team  Name",
      type: "text",
      value: name,
      onChange: (e) => setName(e.target.value),
      placeholder: "Enter team  name",
      required: true,
    },
  ];

  return (
    <FormLayout
      title="Create Team"
      subtitle="Add team members to your project"
      formFields={formFields}
      buttonLabel="Add Team Member"
      onSubmit={handleSubmit}
    />
  );
};

export default CreateTeamForm;
