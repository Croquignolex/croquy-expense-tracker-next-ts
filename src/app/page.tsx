"use client"

import {useContext} from "react";
import {redirect} from "next/navigation";

import {ROUTES_APP} from "@/constants/routes";
import {RootContext} from "@/lib/context";
import {ContextType} from "@/lib/types";

export default function IndexPage(): void {
    const context: ContextType = useContext(RootContext) as ContextType;

    if(context && context.globalState.isAuthorized) {
        redirect(ROUTES_APP.home);
    }

    redirect(ROUTES_APP.login);
};
