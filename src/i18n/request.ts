import {getRequestConfig} from "next-intl/server";
import {getUserLocale} from "@/i18n/service";

export default getRequestConfig(async () => {
    const locale: string = await getUserLocale();

    return {
        locale,
        messages: (await import(`@/assets/locales/${locale}.json`)).default
    };
});