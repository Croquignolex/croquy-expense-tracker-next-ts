"use client"

import {useContext} from "react";
import {redirect} from "next/navigation";

import Footer from "@/components/footer";
import {RootContext} from "@/lib/context";
import {ContextType, LayoutPropsType} from "@/lib/types";
import {ROUTES_APP} from "@/constants/routes";

export default function ProtectedLayout({children}: LayoutPropsType): React.ReactElement {
    const context: object = useContext(RootContext);

    if(!context) {
        redirect(ROUTES_APP.login);
    }

    const ctx = context as ContextType;

    if(!ctx.globalState.isAuthorized) {
        redirect(ROUTES_APP.login);
    }

    return (
        <>
            {children}
            <Footer />
        </>
    );
};
