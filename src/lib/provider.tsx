"use client";

import {FC, ReactElement, useReducer} from "react";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

import {initialGlobalState, rootReducer, RootContext, GlobalStateType} from "@/lib/context";
import {getLocaleStorageItem} from "@/helpers/persist";
import {LayoutPropsType} from "@/lib/types";

const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
            refetchOnWindowFocus: false,
        },
    },
});

const initialFunction = (initial: GlobalStateType): GlobalStateType => {
    const persistedData: GlobalStateType = getLocaleStorageItem("user") as GlobalStateType;

    if(persistedData) {
        return {
            isAuthorized: true,
            emailAddress: persistedData.emailAddress,
            lastName: persistedData.lastName,
            firstName: persistedData.firstName,
            username: persistedData.username,
            phoneNumber: persistedData.phoneNumber,
            avatar: persistedData.avatar,
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