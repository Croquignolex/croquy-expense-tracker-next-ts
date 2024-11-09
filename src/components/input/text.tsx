import {FC, ReactElement} from "react";
import clsx from "clsx";
import {Control, Controller} from "react-hook-form";
import {useTranslations} from "next-intl";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

type TextInputPropsType = {
    control: object;
    name: string;
    label: string;
    placeholder: string;
    disabled?: boolean;
};

const TextInput: FC<TextInputPropsType> = (
    {
        control,
        name,
        label,
        placeholder,
        disabled = false,
    }): ReactElement => {
    const t = useTranslations();

    return (
        <div className="grid gap-2">
            <Controller
                name={name}
                control={control as Control}
                render={({ field, fieldState }) => {
                    return (
                        <>
                            <Label htmlFor={field.name} className={clsx({"text-red-500": fieldState.invalid})}>
                                {label}
                            </Label>

                            <Input
                                type="text"
                                placeholder={placeholder}
                                disabled={disabled}
                                id={field.name}
                                name={field.name}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                ref={field.ref}
                                value={field.value}
                                className={clsx({"border border-red-500 text-red-500": fieldState.invalid})}
                            />

                            {fieldState.invalid && (
                                <p className="text-red-500 text-sm">{t(fieldState.error.message)}</p>
                            )}
                        </>
                    )
                }}
            />
        </div>
    );
};

export {TextInput};