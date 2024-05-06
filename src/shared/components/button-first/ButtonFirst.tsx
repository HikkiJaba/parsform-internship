import React from "react";
import "./ButtonFirst.css";

interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

const ButtonFirst: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
    return (
        <button 
            className="custom-button-first"
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
}

export default ButtonFirst;
