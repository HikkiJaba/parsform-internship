import React, { useState } from "react";
import "./Form.css";
import Input from "../../shared/components/input/Input.tsx";
import ButtonFirst from "../../shared/components/button-first/ButtonFirst.tsx";
import ButtonSecond from "../../shared/components/button-second/ButtonSecond.tsx";
import InputFile from "../../shared/components/input-file/InputFile.tsx";
import Color from "../../shared/components/color/color.tsx";

interface FormField {
    id: string;
    type: string;
    label: string;
    required: boolean;
    placeholder?: string;
    maxlength?: number;
    minlength?: number;
    pattern?: string;
    options?: string[];
    value?: string; // Добавляем свойство value
}


interface FormButton {
    name: string;
    type: string;
}

interface FormData {
    form_name: string;
    form_description: string;
    form_fields: FormField[];
    form_buttons: FormButton[];
}

const Form: React.FC = () => {
    const [formFields, setFormFields] = useState<FormField[]>([]);
    const [formButtons, setFormButtons] = useState<FormButton[]>([]);
    const [formName, setFormName] = useState<string>("");
    const [formDescription, setFormDescription] = useState<string>("");

    const handleFileData = (data: FormData) => {
        console.log("Data from file:", data);
        setFormFields(data.form_fields);
        setFormButtons(data.form_buttons);
        setFormName(data.form_name);
        setFormDescription(data.form_description);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldId: string) => {
        // Обработка изменений в полях формы
        // Вам нужно будет добавить логику обработки изменений для каждого поля
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Логика для отправки формы
    };

    return (
        <section>
            <div className="form-section">
                <InputFile onFileData={handleFileData} />
                <form onSubmit={handleSubmit} className="form-container">
                    <h2>{formName}</h2>
                    <p>{formDescription}</p>
                    {formFields.map((field) => (
                        <div key={field.id}>
                            {field.type === "color" ? (
                                <Color options={field.options || []} />
                            ) : (
                                <Input
                                    key={field.id}
                                    type={field.type}
                                    label={field.label}
                                    required={field.required}
                                    placeholder={field.placeholder || ''}
                                    maxLength={field.maxlength || undefined}
                                    minLength={field.minlength || undefined}
                                    pattern={field.pattern || undefined}
                                    value={field.value || ''}
                                    onChange={(e) => handleInputChange(e, field.id)}
                                    className="form-item"
                                />
                            )}
                        </div>
                    ))}
                    <div className="form-button">
                        {formButtons.map((button) => (
                            button.type === "submit" ? (
                                // @ts-ignore
                                <ButtonFirst key={button.name} label={button.name} type="submit">
                                    {button.name}
                                </ButtonFirst>
                            ) : (
                                // @ts-ignore
                                <ButtonSecond key={button.name} label={button.name} type="button">
                                    {button.name}
                                </ButtonSecond>
                            )
                        ))}
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Form;
