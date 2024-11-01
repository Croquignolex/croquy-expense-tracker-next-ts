import {NextFetchEvent, NextMiddleware, NextResponse} from "next/server";
import type { NextRequest } from "next/server";
import {NextMiddlewareResult} from "next/dist/server/web/types";

import { ROUTES_APP } from "@/constants/routes";
import {MiddlewareFactory} from "@/middleware";

export const redirect: MiddlewareFactory = (next: NextMiddleware) => {
    return async(request: NextRequest, _next: NextFetchEvent): Promise<NextMiddlewareResult> => {
        if (request.nextUrl.pathname === "/") {
            return NextResponse.redirect(new URL(ROUTES_APP.login, request.url));
        }

        return next(request, _next);
    };
};