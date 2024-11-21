import React from "react";

interface ToggleButtonProps {
  toggleFunction: () => void;
  label: string;
  check: boolean;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({ toggleFunction, label, check }) => {
  return (
    <button
      type="button" // Ensure this is type="button" to prevent form submission
      className={`toggleButton ${check ? "active" : ""}`}
      onClick={(event) => {
        event.preventDefault(); // Prevent any potential default behavior (useful in case the button is in a form)
        toggleFunction();
      }}
    >
      {label}
    </button>
  );
};
