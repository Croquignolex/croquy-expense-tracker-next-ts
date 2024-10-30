"use client"

import {ReactElement} from "react";

import Footer from "@/components/footer";
import {LayoutPropsType} from "@/lib/types";
import LocaleSwitcher from "@/components/localeSwitcher";
import ThemeSwitcher from "@/components/themeSwitcher";

export default function PublicLayout({children}: LayoutPropsType): ReactElement {
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
