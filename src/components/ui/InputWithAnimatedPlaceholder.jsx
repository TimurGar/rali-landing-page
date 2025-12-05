import React, { useState } from "react";
import { cn } from "./utils/cn";
import TextType from "./TextAnimations.jsx/TextType/TextType";

const InputWithAnimatedPlaceholder = ({
  id,
  label,
  type = "text",
  animatedTexts = [],
  textColors = [],
  typingSpeed = 50,
  value,
  onChange,
  className = "",
  required = false,
  disabled = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleInputChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (onChange) onChange(e);
  };

  const shouldShowAnimation = !isFocused && !hasValue;

  return (
    <div className={cn("relative flex items-center gap-2", className)}>
      {label && (
        <label htmlFor={id} className="whitespace-nowrap font-semibold">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          type={type}
          id={id}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          disabled={disabled}
          className="flex h-10 w-full border border-white text-white rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus-visible:ring-[2px] focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 relative z-10"
          style={{ background: shouldShowAnimation ? "transparent" : "transparent" }}
          {...props}
        />

        {shouldShowAnimation && (
          <div className="absolute inset-0 flex items-center px-3 pointer-events-none z-0">
            <TextType
              text={animatedTexts}
              textColors={textColors}
              typingSpeed={typingSpeed}
              className="text-white"
              showCursor={true}
              cursorClassName="text-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputWithAnimatedPlaceholder;
