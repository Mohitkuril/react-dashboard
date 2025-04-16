// src/components/TeamMembersForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "../layout/FormLayout"; // Import FormLayout

const defaultMember = {
  name: "",
  role: "",
  email: "",
  availability: 100,
  skills: "",
  joinDate: "",
};

export default function TeamMembersForm({ onSubmit }) {
  const [members, setMembers] = useState([{ ...defaultMember }]);
  const navigate = useNavigate();

  const handleChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const addMember = () => {
    setMembers([...members, { ...defaultMember }]);
  };

  const removeMember = (index) => {
    const updated = [...members];
    updated.splice(index, 1);
    setMembers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(members);
    }
    navigate("/assign-tasks"); // Redirect to assign-tasks page after submit.
  };

  const formFields = members.map((member, index) => [
    {
      id: `name-${index}`,
      type: "text",
      placeholder: "Full Name",
      value: member.name,
      onChange: (e) => handleChange(index, "name", e.target.value),
      required: true,
    },
    {
      id: `role-${index}`,
      type: "text",
      placeholder: "Role (e.g., Developer)",
      value: member.role,
      onChange: (e) => handleChange(index, "role", e.target.value),
      required: true,
    },
    {
      id: `email-${index}`,
      type: "email",
      placeholder: "Email",
      value: member.email,
      onChange: (e) => handleChange(index, "email", e.target.value),
    },
    {
      id: `availability-${index}`,
      type: "number",
      placeholder: "Availability %",
      value: member.availability,
      onChange: (e) => handleChange(index, "availability", e.target.value),
      min: 0,
      max: 100,
    },
    {
      id: `skills-${index}`,
      type: "text",
      placeholder: "Skills (comma-separated)",
      value: member.skills,
      onChange: (e) => handleChange(index, "skills", e.target.value),
    },
    {
      id: `joinDate-${index}`,
      type: "date",
      placeholder: "Join Date",
      value: member.joinDate,
      onChange: (e) => handleChange(index, "joinDate", e.target.value),
    },
  ]);

  return (
    <div>
      {members.map((_, index) => (
        <FormLayout
          key={index}
          title={`Team Member ${index + 1}`}
          subtitle="Add details for this member"
          formFields={formFields[index]}
          buttonLabel="Save & Continue"
          onSubmit={handleSubmit}
        />
      ))}
      <div className="flex justify-between items-center mt-4">
        <button
          type="button"
          onClick={addMember}
          className="text-blue-600 hover:underline"
        >
          + Add Member
        </button>
      </div>
    </div>
  );
}
