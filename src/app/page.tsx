"use client"

import {redirect} from "next/navigation";

import {ROUTES_APP} from "@/constants/routes";

export default function IndexPage(): void {
    redirect(ROUTES_APP.login)
};
