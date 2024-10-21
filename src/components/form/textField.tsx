import {ReactElement} from "react";
import {Field} from "formik";
import clsx from "clsx";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

type TextFieldPropsType = {
    name: string;
    label: string;
    placeholder: string;
    disabled?: boolean;
};

export default function TextField(
    {
        name,
        label,
        placeholder,
        disabled = false,
    }: TextFieldPropsType): ReactElement {

    return (
        <Field name={name}>
            {({ field, form: { touched, errors } }) => {
                const isInvalid: boolean = touched[name] && errors[name];

                return (
                    <div className="grid gap-2">
                        <Label
                            htmlFor={name}
                            className={clsx({"text-red-500": isInvalid})}
                        >
                            {label}
                        </Label>

                        <Input
                            id={name}
                            type="text"
                            placeholder={placeholder}
                            disabled={disabled}
                            {...field}
                            className={clsx({"border border-red-500 text-red-500": isInvalid})}
                        />

                        {isInvalid && (
                            <p className="text-red-500 text-sm">{errors[name]}</p>
                        )}
                    </div>
                );
            }}
        </Field>
    );
};