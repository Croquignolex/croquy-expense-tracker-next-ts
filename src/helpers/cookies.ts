"use server";

import {cookies} from "next/headers";

import {log} from "@/helpers/general";

export const getCookieItem = async (key): Promise<string | null> => {
    if (typeof cookies !== "undefined") {
        const c = await cookies();
        return c.get(key)?.value.toString();
    }

    return null;
};

export const setCookieIItem = async (key, data): Promise<void> => {
    if (typeof cookies !== "undefined") {
        const c = await cookies();
        c.set(key, data.toString());
    } else {
        log("Unable to set local storage", {key, data});
    }
};

export const removeCookieIItem = async (key): Promise<void> => {
    if (typeof cookies !== "undefined") {
        const c = await cookies();
        c.delete(key);
    } else {
        log("Unable to remove local storage", {key});
    }
};