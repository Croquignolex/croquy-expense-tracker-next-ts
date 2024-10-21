import {GlobalStateType, ReducerActionType} from "@/lib/context";
import {ReactNode} from "react";

export enum AlertStatusEnum {
    INFO = "info",
    ERROR = "error",
    SUCCESS = "success",
    WARNING = "warning",
}

export type LayoutPropsType = Readonly<{children: ReactNode}>;

export type MediaType = {
    id: string;
    originalName?: string;
    size?: number;
    path: string;
    createdAt: string;
    base64?: string | null;
}

export type ContextType = {
    globalState: GlobalStateType;
    globalDispatch: (r: ReducerActionType) => void
}

export type ErrorAlertType = {
    show: boolean,
    status?: AlertStatusEnum,
    message?: string
};

export type TokenType = {
    accessToken: string,
    refreshToken: string
};

export type URLParamType = {
    param: string;
    value: any;
};


