import React from "react";
import { useTheme } from "../context/ThemeContext"; // Import useTheme to fetch isDarkMode

export default function FormLayout({
  title,
  subtitle,
  formFields,
  buttonLabel,
  onSubmit,
}) {
  const { isDarkMode } = useTheme(); // Fetch isDarkMode from context

  return (
    <div
      className={` mx-auto mt-6 p-6 rounded-lg shadow-md ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {subtitle && <p className="text-sm mb-4">{subtitle}</p>}
      <form onSubmit={onSubmit} className="space-y-6">
        {formFields.map((field, index) => (
          <div key={index} className="space-y-2">
            <label
              htmlFor={field.id}
              className={`${isDarkMode ? "text-gray-300" : "text-gray-800"}`}
            >
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                id={field.id}
                name={field.id}
                value={field.value}
                onChange={field.onChange}
                className={`w-full p-2 rounded ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-200"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <option value="" disabled>
                  Select a team member
                </option>
                {field.options?.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                placeholder={field.placeholder}
                value={field.value}
                onChange={field.onChange}
                className={`w-full p-2 rounded ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-200"
                    : "bg-gray-100 text-gray-800"
                }`}
                required={field.required}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className={`px-4 py-2 w-full rounded transition-colors ${
            isDarkMode
              ? "bg-blue-700 hover:bg-blue-800"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {buttonLabel}
        </button>
      </form>
    </div>
  );
}
