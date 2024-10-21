
import {ReactElement, useState} from "react";
import {Field} from "formik";
import clsx from "clsx";
import {Eye, EyeClosed} from "lucide-react";

import {Label} from "@/components/ui/label";

type PasswordFieldPropsType = {
    name: string;
    label: string;
};

export default function PasswordField({name, label}: PasswordFieldPropsType): ReactElement {
    const [showPassword, setShowPassword] = useState<boolean>(false);

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

                        <div className="relative">
                            <input
                                id={name}
                                type={showPassword ? "text" : "password"}
                                {...field}
                                className={clsx({
                                    "bg-transparent shadow-sm border border-input text-gray-900 text-sm rounded-md h-9 block w-full ps-10 p-2.5 dark:text-white": true,
                                    "bg-red-100 border border-red-500 text-red-500": isInvalid
                                })}
                                autoComplete="on"
                            />

                            <div
                                className="absolute inset-y-0 start-0 flex items-center ps-3.5 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword
                                    ? <Eye className="size-4" />
                                    : <EyeClosed className="size-4" />
                                }
                            </div>
                        </div>

                        {isInvalid && (
                            <p className="text-red-500 text-sm">{errors[name]}</p>
                        )}
                    </div>
                );
            }}
        </Field>
    );
};