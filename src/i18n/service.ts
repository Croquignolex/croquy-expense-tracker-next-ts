'use server';

import {cookies} from "next/headers";

const COOKIE_NAME: string = "NEXT_LOCALE";
const DEFAULT_LOCALE: string = "en";

export async function getUserLocale(): Promise<string> {
    return cookies().get(COOKIE_NAME)?.value || DEFAULT_LOCALE;
}

export async function setUserLocale(locale: string): Promise<void> {
    cookies().set(COOKIE_NAME, locale);
}