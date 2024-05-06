import React, { useState } from "react";
import "./color.css";
// @ts-ignore
import arrow from "../../icons/arrow-down.svg";

interface ColorProps {
    options: string[];
    onSelect: (color: string | null) => void;
}

const Color: React.FC<ColorProps> = ({ options, onSelect }) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<string>("");

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const selectColor = (color: string) => {
        setSelectedColor(color);
        onSelect(color);
        setMenuOpen(false);
    };

    const clearSelection = () => {
        setSelectedColor("");
        onSelect(null);
    };

    return (
        <div className="color-picker">
            <button type="button" className="button-color" onClick={toggleMenu}>
                <div className="div-color">
                    <div className="square-color" style={{ backgroundColor: selectedColor }}></div>
                    <img src={arrow} alt="Arrow" />
                </div>
            </button>
            {menuOpen && options && options.length > 0 && (
                <div className="color-menu">
                    {options.map((color, index) => (
                        <div
                            key={index}
                            className={`color-option ${selectedColor === color ? "selected" : ""}`}
                            style={{ backgroundColor: color }}
                            onClick={() => selectColor(color)}
                        ></div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Color;
