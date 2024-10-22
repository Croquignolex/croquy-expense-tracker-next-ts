"use client";

import secureLocalStorage from "react-secure-storage";
import {log} from "@/helpers/general";

export function getLocaleStorageItem(key: string): object | null {
    if (typeof window !== "undefined") {
        const data = secureLocalStorage.getItem(key);

        if(data && typeof data === "object") return data;
    }

    return null;
}

export function setLocaleStorageItem(key: string, data: object): void {
    if (typeof window !== "undefined") {
        secureLocalStorage.setItem(key, data);
    } else {
        log("Unable to set local storage", {key, data});
    }
}

export function removeLocaleStorageItem(key: string): void {
    if (typeof window !== "undefined") {
        secureLocalStorage.removeItem(key);
    } else {
        log("Unable to remove local storage", {key});
    }
}

export function removeAllLocaleStorageItems(): void {
    if (typeof window !== "undefined") {
        secureLocalStorage.clear();
    } else {
        log("Unable to remove all local storage");
    }
}