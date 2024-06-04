import React from "react";

interface ICreateInputProps {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  type: string;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreateProfileInput: React.FC<ICreateInputProps> = ({
  label,
  placeholder,
  name,
  type,
  value,
  disabled,
  onChange,
}) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-600 tracking-wide">
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-3 p-3.5 text-sm border border-gray-300 rounded w-full"
        placeholder={placeholder}
        disabled={disabled}
        required
      />
    </div>
  );
};

export default CreateProfileInput;
