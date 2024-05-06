// В компоненте Select.tsx:

import React, { useState } from "react";
import "./Select.css";
// @ts-ignore
import arrow from "../../icons/arrow-down.svg";
// @ts-ignore
import closeIcon from "../../icons/close.svg";
// @ts-ignore
import checkIcon from "../../icons/checked.svg";

interface SelectProps {
    options: string[];
    onSelect: (option: string | null) => void; // Проп для передачи выбранной опции обратно в родительский компонент
}

const Select: React.FC<SelectProps> = ({ options, onSelect }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        onSelect(option);
        setMenuOpen(false);
    };

    const clearSelection = () => {
        setSelectedOption(null);
        onSelect(null);
    };

    return (
        <div className="select-container" onClick={toggleMenu}>
            <div className="select-div">
                <div className="selected-option" onClick={toggleMenu}>{selectedOption || "Select an option"}</div>
                <img src={arrow} className={`arrow-icon ${menuOpen ? "arrow-rotate" : ""}`} />
                {selectedOption && (
                    <div className="clear-selection" onClick={clearSelection}>
                        <img src={closeIcon} className="close-icon" />
                    </div>
                )}
            </div>
            {menuOpen && (
                <div className="options-container">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`option ${selectedOption === option ? "selected" : ""}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                            {selectedOption === option && (
                                <img src={checkIcon} className="check-icon" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Select;
