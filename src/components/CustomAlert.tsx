import {ReactElement} from "react";
import {useTranslations} from "next-intl";
import {AlertCircle, Info} from "lucide-react";

import {AlertStatusEnum, ErrorAlertType} from "@/lib/types";
import {AlertDescription, AlertTitle, Alert} from "@/components/ui/alert";

type CustomAlertPropsType = {
    data: ErrorAlertType,
}

export default function CustomAlert({data}: CustomAlertPropsType): ReactElement | null {
    const {show, status, message} = data;

    const t = useTranslations();

    let d: {icon: ReactElement, title: string, variant: "destructive" | "default"};

    if(!show) {
        return null;
    }

    switch (status) {
        case AlertStatusEnum.ERROR:
            d = {
                icon: <AlertCircle className="size-4" />,
                title: t("error"),
                variant: "destructive"
            };
            break;
        default:
            d = {
                icon: <Info className="size-4" />,
                title: t("info"),
                variant: "default"
            };
    }

    return (
        <Alert variant={d.variant}>
            {d.icon}
            <AlertTitle className="font-bold">{d.title}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
};