import {FC, ReactElement, useState} from "react";
import clsx from "clsx";
import {Eye, EyeClosed} from "lucide-react";
import {Control, Controller} from "react-hook-form";
import {useTranslations} from "next-intl";

import {Label} from "@/components/ui/label";

type PasswordInputPropsType = {
    control: object;
    name: string;
    label: string;
};

const PasswordInput: FC<PasswordInputPropsType> = ({control, name, label}): ReactElement => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
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

                            <div className="relative">
                                <input
                                    id={field.name}
                                    name={field.name}
                                    type={showPassword ? "text" : "password"}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    ref={field.ref}
                                    className={clsx({
                                        "bg-transparent transition-colors shadow-sm border border-input text-gray-900 text-sm rounded-md h-9 block w-full ps-10 p-2.5 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring": true,
                                        "border border-red-500 text-red-500": fieldState.invalid
                                    })}
                                    autoComplete="on"
                                />

                                <div
                                    className="absolute inset-y-0 start-0 flex items-center ps-3.5 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword
                                        ? <Eye className="size-4"/>
                                        : <EyeClosed className="size-4"/>
                                    }
                                </div>
                            </div>

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

export {PasswordInput};