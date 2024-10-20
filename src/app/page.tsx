"use client"

import {useContext} from "react";
import {redirect} from "next/navigation";

import {ROUTES_APP} from "@/constants/routes";
import {RootContext} from "@/lib/context";
import {ContextType} from "@/lib/types";

export default function IndexPage(): void {
    const context: object = useContext(RootContext);

    if(context) {
        const ctx = context as ContextType;

        if(ctx.globalState.isAuthorized) {
            redirect(ROUTES_APP.home);
        }
    }

    redirect(ROUTES_APP.login);
};
