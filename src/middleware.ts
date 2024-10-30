import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const loggedInRoutes = ["/dashboard"];
const loggedOutRoutes = ["/login"];

export default async function AuthMiddleware(req: NextRequest): Promise<NextResponse> {
    console.log('into middleware')

    return NextResponse.next();
}