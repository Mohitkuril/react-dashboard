// src/components/TaskAssignmentForm.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "../../store/taskSlice"; // Import the addTask action
import FormLayout from "../../layout/FormLayout"; // Import FormLayout
import { setDashboardStats } from "../../store/dashboardSlice";

export default function TaskAssignmentForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    deadline: "",
    assignedTo: "",
  });

  const teamMembers = useSelector((state) => state.team.teamMembers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (teamMembers.length === 0) {
      navigate("/team-members"); // Redirect if no team members
    }
  }, [teamMembers, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create task object
    const newTask = {
      ...task,
      id: Date.now(), // Unique ID for the task
    };

    // Dispatch the addTask action to save the task
    dispatch(addTask(newTask));

    // Reset form fields
    setTask({
      title: "",
      description: "",
      deadline: "",
      assignedTo: "",
    });
    dispatch(
      setDashboardStats({
        completedTasks: { done: 32, total: 40 },
        hoursSpent: { total: 150, thisWeek: 40 },
        teamMembers: [{}, {}, {}, {}, {}, {}], // Or your actual team state
        budget: { spent: 7000, total: 30000 },
      })
    );
    dispatch(
      setDashboardStats({
        completedTasks: { done: 32, total: 40 },
        hoursSpent: { total: 150, thisWeek: 40 },
        teamMembers: team, // or array of members
        budget: { spent: 27000, total: 35000 },
        burndown: [
          { date: "Day 1", ideal: 40, actual: 40 },
          { date: "Day 2", ideal: 36, actual: 38 },
          { date: "Day 3", ideal: 32, actual: 35 },
          { date: "Day 4", ideal: 28, actual: 30 },
          { date: "Day 5", ideal: 24, actual: 27 },
          { date: "Day 6", ideal: 20, actual: 25 },
          { date: "Day 7", ideal: 16, actual: 20 },
        ],
      })
    );

    // Navigate to a new page (e.g., task list or project overview)
    navigate("/dashboard");
  };

  const formFields = [
    {
      id: "title",
      label: "Task Title",
      type: "text",
      placeholder: "Enter task title",
      value: task.title,
      onChange: handleChange,
      required: true,
    },
    {
      id: "description",
      label: "Task Description",
      type: "text",
      placeholder: "Enter task description",
      value: task.description,
      onChange: handleChange,
    },
    {
      id: "deadline",
      label: "Deadline",
      type: "date",
      value: task.deadline,
      onChange: handleChange,
    },
    {
      id: "assignedTo",
      label: "Assigned To",
      type: "select",
      value: task.assignedTo,
      onChange: handleChange,
      options: teamMembers.map((member) => ({
        value: member.name,
        label: member.name,
      })),
    },
  ];

  return (
    <FormLayout
      title="Assign Task"
      subtitle="Assign a task to a team member"
      formFields={formFields}
      buttonLabel="Assign Task"
      onSubmit={handleSubmit}
    />
  );
}
