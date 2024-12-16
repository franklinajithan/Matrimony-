import React from "react";
import { Control, Controller } from "react-hook-form";

type Option = {
  value: string | number;
  label: string;
};

interface SelectFieldProps {
  name: string;
  control: Control<any>;
  options: Option[];
  label: string;
  errorMessage?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ name, control, options, label, errorMessage }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor={name}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
              <select
                {...field}
                id={name}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  paddingRight: "2rem", // Add padding for the dropdown icon
                  border: fieldState.error ? "1px solid red" : "1px solid #ccc",
                  borderRadius: "5px",
                  fontSize: "1rem",
                  appearance: "none", // Remove default browser styles
                  background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='gray'%3E%3Cpath d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' /%3E%3C/svg%3E") no-repeat`,
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1rem",
                  backgroundColor: "white",
                }}
              >
                <option value="" disabled>
                  Select {label}
                </option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {fieldState.error && (
              <span
                style={{
                  color: "red",
                  fontSize: "0.875rem",
                  marginTop: "0.25rem",
                  display: "block",
                }}
              >
                {fieldState.error.message || errorMessage}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default SelectField;
