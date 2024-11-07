import {Context, createContext} from "react";

import {MediaType} from "@/lib/types";
import {GLOBAL_ACTION_TYPES} from "@/constants/actions";
import {RoleEnum} from "@/lib/enums";

export type GlobalStateType = {
    isAuthorized: boolean;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    firstName: string;
    username: string;
    role?: RoleEnum | null;
    avatar?: MediaType | null;
};

export type LoginActionPayloadType = {
    firstName: string;
    username: string;
    role: RoleEnum;
    avatar?: MediaType | null;
};

export type ReducerActionType = {
    type: string;
    payload?: object;
};

export const initialGlobalState: GlobalStateType = {
    isAuthorized: false,
    emailAddress: "",
    lastName: "",
    firstName: "",
    username: "",
    phoneNumber: "",
    avatar: null,
    role: null,
};

export const rootReducer = (state: GlobalStateType = initialGlobalState, action: ReducerActionType): GlobalStateType => {
    let nextState: GlobalStateType;

    switch (action.type) {

        case GLOBAL_ACTION_TYPES.LOGIN:
            const payload: LoginActionPayloadType = action.payload as LoginActionPayloadType;

            if(payload) {
                nextState = {
                    ...state,
                    firstName: payload.firstName,
                    username: payload.username,
                    role: payload.role,
                    avatar: payload.avatar,
                };
            }

            return nextState || state;

        case GLOBAL_ACTION_TYPES.CLEAR_DATA:
            return initialGlobalState;

        default:
            return state;
    }
};

export const RootContext: Context<object> = createContext(null);