import {ReactNode} from "react";

import {AlertStatusEnum, RoleEnum} from "@/lib/enums";

export type LayoutPropsType = Readonly<{children: ReactNode}>;

export type GlobalStateType = {
    user: UserType
};

export type ReducerActionType = {
    type: string;
    payload?: object;
};

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
    value: unknown;
};

export type UserType = {
    isAuthorized?: boolean;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    firstName: string;
    username: string;
    role?: RoleEnum | null;
    avatar?: MediaType | null;
};

export type MediaType = {
    id: string;
    originalName?: string;
    size?: number;
    path: string;
    createdAt: string;
    base64?: string | null;
}

