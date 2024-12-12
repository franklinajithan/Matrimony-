import React from "react";
import { Controller } from "react-hook-form";

const InputField = ({ control, name, label, type, placeholder }: any) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              className={`mt-1 block w-full border ${
                fieldState.error ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2`}
            />
            {fieldState.error && (
              <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default InputField;
