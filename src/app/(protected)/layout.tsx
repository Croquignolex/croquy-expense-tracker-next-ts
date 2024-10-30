"use client"

import {ReactElement} from "react";

import Footer from "@/components/footer";
import {LayoutPropsType} from "@/lib/types";

export default function ProtectedLayout({children}: LayoutPropsType): ReactElement {
    return (
        <>
            {children}
            <Footer />
        </>
    );
};
