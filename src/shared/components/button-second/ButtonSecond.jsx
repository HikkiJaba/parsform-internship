import React from "react";
import "./ButtonSecond.css";

const ButtonSecond = ({label, onClick, disabled}) => {
    return (
        <button 
            className="custom-button-second"
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
}

export default ButtonSecond;
