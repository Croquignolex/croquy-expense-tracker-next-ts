"use client";

import {FC, ReactElement, useReducer} from "react";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

import {initialGlobalState, rootReducer, RootContext} from "@/lib/context";
import {getLocaleStorageItem} from "@/lib/persist";
import {GlobalStateType, LayoutPropsType, UserType} from "@/lib/types";

const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
            refetchOnWindowFocus: false,
        },
    },
});

const initialFunction = (initial: GlobalStateType): GlobalStateType => {
    const persistedData: UserType = getLocaleStorageItem("user") as UserType;

    if(persistedData) {
        return {
            ...initial,
           user: {
                ...initial.user,
               isAuthorized: true,
               emailAddress: persistedData.emailAddress,
               lastName: persistedData.lastName,
               firstName: persistedData.firstName,
               username: persistedData.username,
               phoneNumber: persistedData.phoneNumber,
               avatar: persistedData.avatar,
               role: persistedData.role,
           }
        }
   } else return initial;
};

const ClientProvider: FC<LayoutPropsType> = ({children}): ReactElement => {
    const [globalState, globalDispatch] = useReducer(rootReducer, initialGlobalState, initialFunction);

    return (
        <QueryClientProvider client={queryClient}>
            <RootContext.Provider value={{globalState, globalDispatch}}>
                {children}
            </RootContext.Provider>
        </QueryClientProvider>
    );
};

export {ClientProvider};