import React from "react";
import "./Input.css";

const Input = ({ type, value, onChange}) => {
    return (
        <input 
            type={type}
            value={value}
            onChange={onChange}
            className="custom-input"
        />
    )
}

export default Input;