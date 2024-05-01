import React, { useState } from "react";
import Input from "../../shared/components/input/Input";
import ButtonFirst from "../../shared/components/button-first/ButtonFirst";
import ButtonSecond from "../../shared/components/button-second/ButtonSecond";
import InputFile from "../../shared/components/input-file/InputFile";

export default function Form() {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <section>
            <h1>Leave your contact</h1>
            <p>We want to know all about you</p>
            <Input type="text" value={value} onChange={handleChange} />
            <ButtonFirst label="Привет" />
            <ButtonSecond label="Нажми"/>
            <InputFile />
        </section>
    )
}
