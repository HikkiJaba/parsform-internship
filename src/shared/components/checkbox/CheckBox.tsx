import React, { useState } from "react";
import "./CheckBox.css"; 

const CheckBox = ({ id, label, required, onSelect }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onSelect(id, newChecked);
  };

  return (
    <label htmlFor={id} className="checkbox-label">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        required={required}
      />
      <span className={`custom-checkbox ${checked ? "checked" : ""}`}></span>
      {label}
    </label>
  );
};

export default CheckBox;
