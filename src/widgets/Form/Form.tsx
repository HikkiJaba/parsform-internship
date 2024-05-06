import React, { useState } from "react";
import "./Form.css";
import Input from "../../shared/components/input/Input.tsx";
import ButtonFirst from "../../shared/components/button-first/ButtonFirst.tsx";
import ButtonSecond from "../../shared/components/button-second/ButtonSecond.tsx";
import InputFile from "../../shared/components/input-file/InputFile.tsx";
import InputFileNoPars from "../../shared/components/input-file-no-pars/InputFile.tsx";
import Color from "../../shared/components/color/color.tsx";
import Select from "../../shared/components/select/Select.tsx";
import CheckBox from "../../shared/components/checkbox/CheckBox.tsx";

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
    value?: string;
    error?: string;
    onSelect?: (fieldId: string, value: string | boolean | null) => void; // Обновленный тип onSelect
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
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const basePatterns: { [key: string]: string } = {
        password: "[0-9a-zA-Z]{4,30}",
        date: "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/(19|20)\\d{2}$",
        email: "[0-9a-zA-Z]{4,30}"
    };

    const handleFileData = (data: FormData, files: File[]) => {
        setFormFields(data.form_fields);
        setFormButtons(data.form_buttons);
        setFormName(data.form_name);
        setFormDescription(data.form_description);
        setSelectedFiles(files);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldId: string) => {
        const { value } = e.target;

        const updatedFields = formFields.map(field => {
            if (field.id === fieldId) {
                const error =
                    (field.required && !value.trim()) ? `${field.label} обязательно для заполнения.` :
                    (field.maxlength && value.length > field.maxlength) ? `${field.label} должно содержать не более ${field.maxlength} символов.` :
                    (field.minlength && value.length < field.minlength) ? `${field.label} должно содержать не менее ${field.minlength} символов.` :
                    undefined;
                return { ...field, value, error };
            }
            return field;
        });

        setFormFields(updatedFields);
    };

    const handleInputChangeCheckbox = (fieldId: string, value: boolean) => {
        const updatedFields = formFields.map(field => {
            if (field.id === fieldId) {
                return { ...field, value: value.toString() };
            }
            return field;
        });
    
        setFormFields(updatedFields);
    };

    const handleSubmit = async () => {
        const isValid = formFields.every(field => !field.error);
    
        if (isValid) {
            const formData: { [key: string]: string } = {};
            formFields.forEach(field => {
                if (field.id !== "selectOption") {
                    formData[field.id] = field.value || '';
                }
            });
    
            console.log("Form fields:", formData);
            setFormFields(prevFormFields => {
                return prevFormFields.map(field => {
                    return { ...field, value: '' };
                });
            });
        } else {
            console.error("Form submission halted due to validation errors.");
        }
    };
    

    const handleSelectChange = (fieldId: string, option: string | null) => {
        setSelectedOption(option);
        const updatedFields = formFields.map(field => {
            if (field.id === fieldId) {
                return { ...field, value: option || "" };
            }
            return field;
        });
        setFormFields(updatedFields);
    };

    return (
        <section>
            <div className="form-section">
                <InputFile onFileData={(data, files) => handleFileData(data, files)} />
                <form onSubmit={handleSubmit} className="form-container">
                    <h2>{formName}</h2>
                    <p>{formDescription}</p>
                    {formFields.map((field) => (
                        <div key={field.id}>
                            {field.type === "color" ? (
                                <Color options={field.options || []} onSelect={value => handleSelectChange(field.id, value)} />
                            ) : (
                                field.type === "select" ? (
                                    <Select options={field.options || []} onSelect={value => handleSelectChange(field.id, value)} />
                                ) : (
                                    field.type === "file" ? (
                                        <InputFileNoPars
                                            key={field.id}
                                            onFileData={() => {}}
                                            fileData={field}
                                        />
                                    ) : (
                                        field.type === "checkbox" ? (
                                            <CheckBox
                                                key={field.id}
                                                id={field.id}
                                                label={field.label}
                                                required={field.required}
                                                onSelect={(fieldId, value) => handleInputChangeCheckbox(fieldId, value)}
                                            />
                                        ) : (
                                            <Input
                                                key={field.id}
                                                type={field.type}
                                                label={field.label}
                                                required={field.required}
                                                placeholder={field.placeholder || ''}
                                                maxLength={field.maxlength || undefined}
                                                minLength={field.minlength || undefined}
                                                pattern={basePatterns[field.id] || '.*'}
                                                value={field.value || ''}
                                                onChange={(e) => handleInputChange(e, field.id)}
                                                className="form-item"
                                                error={field.error}
                                            />
                                        )
                                    )
                                )
                            )}
                        </div>
                    ))}
                    <div className="form-button">
                        {formButtons.map((button) => (
                            button.type === "submit" ? (
                                <ButtonFirst key={button.name} label={button.name} onClick={handleSubmit} disabled={formFields.some(field => field.error)}/> 
                            ) : (
                                // @ts-ignore
                                <ButtonSecond key={button.name} label={button.name} />
                            )
                        ))}
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Form;
