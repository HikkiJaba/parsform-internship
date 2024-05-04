import React, { useState } from "react";
import "./Form.css";
import Input from "../../shared/components/input/Input";
import ButtonFirst from "../../shared/components/button-first/ButtonFirst";
import ButtonSecond from "../../shared/components/button-second/ButtonSecond";
import InputFile from "../../shared/components/input-file/InputFile";
import Color from "../../shared/components/color/color";

export default function Form() {
    const [formFields, setFormFields] = useState([]);
    const [formButtons, setFormButtons] = useState([]);
    const [formName, setFormName] = useState([]);
    const [formDescription, setFromDescription] = useState([]);

    const handleFileData = (data) => {
        console.log("Data from file:", data);
        setFormFields(data.form_fields);
        setFormButtons(data.form_buttons);
        setFormName(data.form_name);
        setFromDescription(data.form_description);
    };

    const handleInputChange = (e, fieldId) => {

    };

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <section>
            <div className="form-section">
                <InputFile onFileData={handleFileData} />
                <form onSubmit={handleSubmit} className="form-container">
                    <h2>{formName}</h2>
                    <p>{formDescription}</p>
                    {formFields.map(field => (
                        <div key={field.id}>
                            {field.type === "color" ? (
                                <Color options={field.options} />
                            ) : (
                                <Input
                                    type={field.type}
                                    label={field.label}
                                    required={field.required}
                                    placeholder={field.placeholder}
                                    maxLength={field.maxlength}
                                    minLength={field.minlength}
                                    pattern={field.pattern}
                                    onChange={(e) => handleInputChange(e, field.id)}
                                    className="form-item"
                                />
                            )}
                        </div>
                    ))}
                    <div className="form-button">
                        {formButtons.map(button => (
                            button.type === "submit" ? (
                                <ButtonFirst key={button.name} label={button.name} type="submit">
                                    {button.name}
                                </ButtonFirst>
                            ) : (
                                <ButtonSecond key={button.name} label={button.name} type="button">
                                    {button.name}
                                </ButtonSecond>
                            )
                        ))}
                    </div>
                </form>
            </div>
        </section>
    )
}
