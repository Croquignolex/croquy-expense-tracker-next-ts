import {getRequestConfig} from "next-intl/server";

/*
export default getRequestConfig(async ({locale}) => {
    // Validate that the incoming `locale` parameter is valid
    if (!routing.locales.includes(locale as "fr" | "en")) notFound();

    return {
        messages: (await import(`@/src/assets/locales/${locale}.json`)).default
    };
});
*/

export default getRequestConfig(async () => {
    // Provide a static locale, fetch a user setting,
    // read from `cookies()`, `headers()`, etc.
    const locale = 'en';

    return {
        locale,
        messages: (await import(`@/src/assets/locales/${locale}.json`)).default
    };
});