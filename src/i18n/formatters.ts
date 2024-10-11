import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dayjs/locale/fr");

dayjs.extend(localizedFormat)

const EN: string = "en";
const FR: string = "fr";

const qualifiedLngFor = (lng?: string): string => {
    switch (lng) {
        case FR: return "fr-FR";
        case EN: return "en-US";
        default: return EN;
    }
}

export const date = (stringDate: string, lng?: string): string => {
    dayjs.locale(lng);
    const temp: string = dayjs(stringDate).format("LL");
    return (temp === "Invalid Date") ? "" : temp;
}

export const datetime = (stringDate: string, lng?: string): string => {
    dayjs.locale(lng);
    const temp: string = dayjs(stringDate).format("LLL");
    return (temp === "Invalid Date") ? "" : temp;
}

export const currency = (number: number, lng?: string): string => {
    const format = Intl.NumberFormat(qualifiedLngFor(lng), {
        style: "currency",
        currency: "XAF",
    });
    return format.format(number);
}