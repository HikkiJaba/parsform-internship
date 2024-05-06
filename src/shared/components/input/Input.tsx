import React, { useState } from "react";
import "./Input.css";

const Input = ({ type, label, required, placeholder, maxLength, minLength, pattern, value, onChange, className }: any) => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        onChange(e);

        if (required && !value.trim()) {
            setErrorMessage(`${label} обязательно для заполнения.`);
        } else if (maxLength && value.length > maxLength) {
            setErrorMessage(`${label} должно содержать не более ${maxLength} символов.`);
        } else if (minLength && value.length < minLength) {
            setErrorMessage(`${label} должно содержать не менее ${minLength} символов.`);
        } else if (pattern && !new RegExp(pattern).test(value)) {
            setErrorMessage(`Неверный формат ${label}.`);
        } else {
            setErrorMessage(undefined);
        }
    };

    return (
        <div className="error-input-container">
            <input
                type={type}
                aria-label={label}
                required={required}
                placeholder={placeholder}
                maxLength={maxLength}
                minLength={minLength}
                pattern={pattern}
                value={value}
                onChange={handleInputChange}
                className={`custom-input ${errorMessage ? 'error-border' : ''} ${className}`}
            />
            {errorMessage && <span className="error-input">{errorMessage}</span>}
        </div>
    );
};

export default Input;
