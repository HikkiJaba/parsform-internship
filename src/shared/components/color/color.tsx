import React, { useState } from "react";
// @ts-ignore
import arrow from "../../icons/arrow-down.svg";
import "./color.css";

interface ButtonSecondProps {
    options: string[];
}

type BackgroundColor = string | undefined;

const ButtonSecond: React.FC<ButtonSecondProps> = ({ options }) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<BackgroundColor>(undefined);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const selectColor = (color: string) => {
        setSelectedColor(color);
        setMenuOpen(false);
    };

    return (
        <div className="color-picker">
            <button className="button-color" onClick={toggleMenu}>
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
