import {getCookieItem, setCookieIItem} from "@/lib/cookies";

const COOKIE_NAME: string = "NEXT_LOCALE";
const DEFAULT_LOCALE: string = "en";

export async function getUserLocale(): Promise<string> {
    return await getCookieItem(COOKIE_NAME) || DEFAULT_LOCALE;
}

export async function setUserLocale(locale: string): Promise<void> {
    return await setCookieIItem(COOKIE_NAME, locale);
}