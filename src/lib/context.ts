import {Context, createContext} from "react";

import {MediaType} from "@/src/lib/types";
import {GLOBAL_STATE_UPDATE_LOGIN_DATA, GLOBAL_STATE_CLEAR_DATA} from "@/src/constants/actions";

export type GlobalStateType = {
    isAuthorized: boolean;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    firstName: string;
    username: string;
    avatar?: MediaType | null;
};

type ReducerActionType = {
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

        case GLOBAL_STATE_UPDATE_LOGIN_DATA:
            const payload: object = action.payload;

            if(payload) {
                nextState = {
                    ...state,
                    firstName: payload?.firstName,
                    username: payload?.username,
                    avatar: payload?.avatar,
                };
            }

            return nextState || state;

        case GLOBAL_STATE_CLEAR_DATA:
            return initialGlobalState;

        default:
            return state;
    }
};

export const RootContext: Context<object | null> = createContext(null);