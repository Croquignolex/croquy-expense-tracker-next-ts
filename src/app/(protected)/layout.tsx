"use client"

import {ReactElement, useContext} from "react";
import {redirect} from "next/navigation";

import Footer from "@/components/footer";
import {RootContext} from "@/lib/context";
import {ContextType, LayoutPropsType} from "@/lib/types";
import {ROUTES_APP} from "@/constants/routes";

export default function ProtectedLayout({children}: LayoutPropsType): ReactElement {
    const context: ContextType = useContext(RootContext) as ContextType;

    if(!context || !context.globalState.isAuthorized) {
        redirect(ROUTES_APP.login);
    }

    return (
        <>
            {children}
            <Footer />
        </>
    );
};
