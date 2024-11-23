import {Context, createContext} from "react";

import {GlobalStateType, ReducerActionType, UserType} from "@/lib/types";
import {ACTION_TYPES} from "@/constants/actions";

export const initialGlobalState: GlobalStateType = {
    user: {
        isAuthorized: false,
        emailAddress: "",
        lastName: "",
        firstName: "",
        username: "",
        phoneNumber: "",
        avatar: null,
        role: null,
    }
};

export const rootReducer = (state: GlobalStateType = initialGlobalState, action: ReducerActionType): GlobalStateType => {
    let nextState: GlobalStateType;

    switch (action.type) {

        case ACTION_TYPES.LOGIN:
            const payload: UserType = action.payload as UserType;

            if(payload) {
                nextState = {
                    ...state,
                   user: {
                        ...state.user,
                       firstName: payload.firstName,
                       lastName: payload.lastName,
                       username: payload.username,
                       emailAddress: payload.emailAddress,
                       phoneNumber: payload.phoneNumber,
                       role: payload.role,
                       avatar: payload.avatar,
                   }
                };
            }

            return nextState || state;

        case ACTION_TYPES.CLEAR_DATA:
            return initialGlobalState;

        default:
            return state;
    }
};

export const RootContext: Context<object> = createContext(null);