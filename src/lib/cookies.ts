"use server";

import {cookies} from "next/headers";

import {log} from "@/lib/helpers";

export const getCookieItem = async (key: string): Promise<string | null> => {
    if (typeof cookies !== "undefined") {
        const c = await cookies();
        return c.get(key)?.value.toString();
    }

    return null;
};

export const setCookieIItem = async (key: string, data: string): Promise<void> => {
    if (typeof cookies !== "undefined") {
        const c = await cookies();
        c.set(key, data);
    } else {
        log("Unable to set local storage", {key, data});
    }
};

export const removeCookieIItem = async (key: string): Promise<void> => {
    if (typeof cookies !== "undefined") {
        const c = await cookies();
        c.delete(key);
    } else {
        log("Unable to remove local storage", {key});
    }
};