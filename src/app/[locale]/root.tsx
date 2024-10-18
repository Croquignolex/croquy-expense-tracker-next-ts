"use client";

import React, {useReducer} from "react";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ThemeProvider} from "next-themes";

import {initialGlobalState, rootReducer, RootContext, GlobalStateType} from "@/lib/context";
import {getLocaleStorageItem} from "@/helpers/localStorageHelpers";

const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
            refetchOnWindowFocus: false,
        },
    },
});

const initialFunction = (initial: GlobalStateType): GlobalStateType => {
    const persistedData: object = getLocaleStorageItem("user");

       if(persistedData) {
           return {
               isAuthorized: true,
               emailAddress: persistedData?.emailAddress,
               lastName: persistedData?.lastName,
               firstName: persistedData?.firstName,
               username: persistedData?.username,
               phoneNumber: persistedData?.phoneNumber,
               avatar: persistedData?.avatar,
           }
       } else return initial;
}

export default function Root({children}: Readonly<{children: React.ReactNode}>) {
    const [globalState, globalDispatch] = useReducer(rootReducer, initialGlobalState, initialFunction);


    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <QueryClientProvider client={queryClient}>
                <RootContext.Provider value={{globalState, globalDispatch}}>
                    {children}
                </RootContext.Provider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}