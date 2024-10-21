import {Context, createContext} from "react";

import {MediaType} from "@/lib/types";
import {globalActionTypes} from "@/constants/actions";

export type GlobalStateType = {
    isAuthorized: boolean;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    firstName: string;
    username: string;
    avatar?: MediaType | null;
};

export type LoginActionPayloadType = {
    firstName: string;
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
};

export const rootReducer = (state: GlobalStateType = initialGlobalState, action: ReducerActionType): GlobalStateType => {
    let nextState: GlobalStateType;

    switch (action.type) {

        case globalActionTypes.LOGIN:
            const payload: LoginActionPayloadType = action.payload as LoginActionPayloadType;

            if(payload) {
                nextState = {
                    ...state,
                    firstName: payload.firstName,
                    avatar: payload.avatar,
                };
            }

            return nextState || state;

        case globalActionTypes.CLEAR_DATA:
            return initialGlobalState;

        default:
            return state;
    }
};

export const RootContext: Context<object> = createContext(null);