"use client"

import {useContext, ReactElement} from "react";
import {redirect} from "next/navigation";

import Footer from "@/components/footer";
import {RootContext} from "@/lib/context";
import {ContextType, LayoutPropsType} from "@/lib/types";
import {ROUTES_APP} from "@/constants/routes";
import LocaleSwitcher from "@/components/localeSwitcher";
import ThemeSwitcher from "@/components/themeSwitcher";

export default function PublicLayout({children}: LayoutPropsType): ReactElement {
    const context: object = useContext(RootContext);

    if(context) {
        const ctx = context as ContextType;

        if(ctx.globalState.isAuthorized) {
            redirect(ROUTES_APP.home);
        }
    }

    return (
       <>
           <header className="my-5 mr-5 top-0 right-0 absolute inline-flex space-x-1">
               <LocaleSwitcher />
               <ThemeSwitcher />
           </header>
           {children}
           <Footer absolute />
       </>
    );
};
