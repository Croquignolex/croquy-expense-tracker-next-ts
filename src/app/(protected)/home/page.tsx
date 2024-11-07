import {ReactElement, useContext} from "react";

import {ContextType} from "@/lib/types";
import {RootContext} from "@/lib/context";

export default function HomePage(): ReactElement {
    const context: ContextType = useContext(RootContext) as ContextType;

    return (
        <div>Home page {context.globalState.firstName}</div>
    );
};
