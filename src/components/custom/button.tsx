import {FC, ReactElement} from "react";
import {Loader2} from "lucide-react";

import {Button} from "@/components/ui/button";

type CustomButtonPropsType = {
    className: string,
    disabled?: boolean,
    loading?: boolean,
    label: string,
    type?: "submit" | "reset" | "button" | undefined,
};

const CustomButton: FC<CustomButtonPropsType> = ({
     className,
     label,
     type = "submit",
     disabled = false,
     loading = false,
}): ReactElement => {
    return (
        <Button className={className} disabled={disabled || loading} type={type}>
            {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
            {label}
        </Button>
    );
};

export {CustomButton};