import React from "react";
import "./Select.css";
type SelectProps = {
  onFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
};
export const Select: React.FC<SelectProps> = ({ onFilter, options }) => {
  return (
    <div className="select-wrap">
      <select onChange={onFilter} data-testid="select">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
