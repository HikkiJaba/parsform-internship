import React from "react";
import "./Input.css";

const Input = ({ type, label, required, placeholder, maxLength, minLength, pattern, value, onChange, className }) => {
    return (
        <input 
            type={type}
            aria-label={label}
            required={required}
            placeholder={placeholder}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            value={value}
            onChange={onChange}
            className={`custom-input ${className}`}
        />
    )
}

export default Input;
