import {FC, ReactElement, useState} from "react";
import clsx from "clsx";
import {Eye, EyeClosed} from "lucide-react";

import {Label} from "@/components/ui/label";

type PasswordInputPropsType = {
    field: object;
    label: string;
};

const PasswordInput: FC<PasswordInputPropsType> = ({field, label}): ReactElement => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const isInvalid: boolean = !!field.errors;

    return (
        <div className="grid gap-2">
            <Label htmlFor={field.name} className={clsx({"text-red-500": isInvalid})}>
                {label}
            </Label>

            <div className="relative">
                <input
                    id={field.id}
                    name={field.name}
                    key={field.key}
                    type={showPassword ? "text" : "password"}
                    className={clsx({
                        "bg-transparent transition-colors shadow-sm border border-input text-gray-900 text-sm rounded-md h-9 block w-full ps-10 p-2.5 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring": true,
                        "border border-red-500 text-red-500": isInvalid
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
                <p className="text-red-500 text-sm">{field.errors}</p>
            )}
        </div>
    );
};

export {PasswordInput};