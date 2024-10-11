import secureLocalStorage from "react-secure-storage";

export const getLocaleStorageItem = (key: string): object | null => {
    const data = secureLocalStorage.getItem(key);

    if(data && typeof data === "object") return data;

    return null;
};

export const setLocaleStorageItem = (key: string, data: object): void => {
    secureLocalStorage.setItem(key, data);
};

export const removeLocaleStorageItem = (key: string): void => {
    secureLocalStorage.removeItem(key);
};

export const removeAllLocaleStorageItems = (): void => {
    secureLocalStorage.clear();
};