import React from "react";
import { Controller } from "react-hook-form";

interface InputFieldProps {
  control: any; // Use the appropriate type from react-hook-form if possible, like Control<FieldValues>.
  name: string;
  label: string;
  type: string;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ control, name, label, type, placeholder }) => {
  return (
    <div className="mb-4">
      {/* Link the label to the input using htmlFor and id */}
      <label className="block text-sm font-medium text-gray-700" htmlFor={name}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            {/* Properly associate input and label using id */}
            <input
              id={name}
              {...field}
              type={type}
              placeholder={placeholder}
              className={`block w-full border ${fieldState.error ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2`}
              aria-invalid={fieldState.error ? "true" : "false"}
              aria-describedby={fieldState.error ? `${name}-error` : undefined}
            />
            {fieldState.error && (
              <p id={`${name}-error`} className="text-red-500 text-sm mt-1" role="alert">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default InputField;
