import {ReactElement} from "react";
import {Loader2} from "lucide-react";

import {Button} from "@/components/ui/button";

type CustomButtonPropsType = {
    className: string,
    disabled?: boolean,
    loading?: boolean,
    label: string,
}

export default function CustomButton({
     className,
     label,
     disabled = false,
     loading = false
}: CustomButtonPropsType): ReactElement {
    return (
        <Button className={className} disabled={disabled || loading}>
            {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
            {label}
        </Button>
    );
};