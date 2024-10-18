import {notFound} from "next/navigation";
import {getRequestConfig} from "next-intl/server";
import {routing} from "@/src/i18n/routing";

export default getRequestConfig(async ({locale}) => {
    // Validate that the incoming `locale` parameter is valid
    if (!routing.locales.includes(locale as "fr" | "en")) notFound();

    return {
        messages: (await import(`@/src/assets/locales/${locale}.json`)).default
    };
});