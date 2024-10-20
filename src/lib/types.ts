import {GlobalStateType} from "@/lib/context";
import {DispatchWithoutAction, ReactNode} from "react";

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
    globalDispatch: DispatchWithoutAction
}

