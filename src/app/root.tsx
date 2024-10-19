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
    const persistedData: object | null = getLocaleStorageItem("user");

       if(persistedData) {
           const p = persistedData as GlobalStateType;

           return {
               isAuthorized: true,
               emailAddress: p.emailAddress,
               lastName: p.lastName,
               firstName: p.firstName,
               username: p.username,
               phoneNumber: p.phoneNumber,
               avatar: p.avatar,
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