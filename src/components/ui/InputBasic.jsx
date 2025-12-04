import React from "react";
import { cn } from "./utils/cn";

const InputBasic = ({
  id,
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  required = false,
  disabled = false,
  pattern,
  title,
  ...props
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {label && (
        <label htmlFor={id} className="whitespace-nowrap font-semibold">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        pattern={pattern}
        title={title}
        className="flex h-10 w-full border border-gray-300 bg-white text-black rounded-md px-3 py-2 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus-visible:ring-[2px] focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      />
    </div>
  );
};

export default InputBasic;
