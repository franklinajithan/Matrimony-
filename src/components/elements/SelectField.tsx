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
      <label className="block text-sm font-medium text-gray-700" htmlFor={name}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <select {...field} id={name} style={{ width: "100%", padding: "0.5rem", border: fieldState.error ? "1px solid red" : "1px solid #ccc", borderRadius: "4px", fontSize: "1rem" }}>
              <option value="" disabled>
                Select {label}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {fieldState.error && <span style={{ color: "red", fontSize: "0.875rem", marginTop: "0.25rem", display: "block" }}>{fieldState.error.message || errorMessage}</span>}
          </>
        )}
      />
    </div>
  );
};

export default SelectField;
