import React from "react";
import "./ButtonFirst.css";

const Button = ({label, onClick, disabled}) => {
    return (
        <button 
            className="custom-button-first"
            onClick = {onClick}
            disabled = {disabled}
        >
            {label}
        </button>
    );
}

export default Button;