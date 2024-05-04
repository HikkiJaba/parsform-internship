import React, { useState } from "react";
import arroy from "../../icons/arrow-down.svg";
import "./color.css";

const ButtonSecond = ({ options }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const selectColor = (color) => {
        setSelectedColor(color);
        setMenuOpen(false);
    };

    return (
        <div className="color-picker">
            <button className="button-color" onClick={toggleMenu}>
                <div className="div-color">
                    <div className="square-color" style={{ backgroundColor: selectedColor }}></div>
                    <img src={arroy} alt="Arrow" />
                </div>
            </button>
            {menuOpen && options && options.length > 0 && (
                <div className="color-menu">
                    {options.map((color, index) => (
                        <div
                            key={index}
                            className="color-option"
                            style={{ backgroundColor: color }}
                            onClick={() => selectColor(color)}
                        ></div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ButtonSecond;
