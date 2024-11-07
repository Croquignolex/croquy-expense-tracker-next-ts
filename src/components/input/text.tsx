import {FC, ReactElement} from "react";
import clsx from "clsx";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

type TextInputPropsType = {
    field: object;
    label: string;
    placeholder: string;
    disabled?: boolean;
};

const TextInput: FC<TextInputPropsType> = (
    {
        field,
        label,
        placeholder,
        disabled = false,
    }): ReactElement => {

    const isInvalid: boolean = !!field.errors;

    return (
        <div className="grid gap-2">
            <Label htmlFor={field.name} className={clsx({"text-red-500": isInvalid})}>
                {label}
            </Label>

            <Input
                id={field.id}
                name={field.name}
                type="text"
                placeholder={placeholder}
                disabled={disabled}
                key={field.key}
                // defaultValue={value}
                className={clsx({"border border-red-500 text-red-500": isInvalid})}
            />

            {isInvalid && (
                <p className="text-red-500 text-sm">{field.errors}</p>
            )}
        </div>
    );
};

export {TextInput};