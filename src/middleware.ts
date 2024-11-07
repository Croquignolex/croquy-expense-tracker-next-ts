import {redirect} from "@/middlewares/redirect";
import {NextMiddleware, NextResponse} from "next/server";

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

const stackMiddlewares = (functions: Array<MiddlewareFactory> = [], index: number = 0): NextMiddleware => {
    const current = functions[index];

    if (current) {
        const next = stackMiddlewares(functions, index + 1);
        return current(next);
    }

    return () => NextResponse.next();
};

export default stackMiddlewares([
    redirect
]);