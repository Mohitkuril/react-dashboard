// src/layout/FormLayout.jsx
import React from "react";

export default function FormLayout({
  title,
  subtitle,
  formFields,
  buttonLabel,
  onSubmit,
}) {
  return (
    <div className="w-[90%] md:w-[40vw] mx-auto mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {subtitle}
        </p>
      )}
      <form onSubmit={onSubmit} className="space-y-6">
        {formFields.map((field, index) => (
          <div key={index} className="space-y-2">
            <label
              htmlFor={field.id}
              className="text-gray-700 dark:text-gray-200"
            >
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                id={field.id}
                name={field.id}
                value={field.value}
                onChange={field.onChange}
                className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
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
                className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                required={field.required}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          {buttonLabel}
        </button>
      </form>
    </div>
  );
}
