import {getLocaleStorageItem, removeAllLocaleStorageItems, setLocaleStorageItem} from "@/lib/persist";
import {TokenType, URLParamType, UserType} from "@/lib/types";
import {ROUTES_API} from "@/constants/routes";
import {ENV_API} from "@/constants/configs";
import {log} from "@/lib/helpers";

export type ResponseType = {
    status: boolean;
    message: string;
    data: unknown;
};

type RefreshTokenResponseType = {
    tokens: TokenType;
    user: UserType;
};

const API_V1_BASE_URL: string = `${ENV_API.BASE_URL}/api/v1`;

// Build v1 url
export const apiV1URL = (url: string, params?: Array<URLParamType>, queries?: Array<URLParamType>): string => {
    return joinBaseUrlWithParams(API_V1_BASE_URL + url, params, queries);
};

// Build complete url
export const joinBaseUrlWithParams = (url: string, params?: Array<URLParamType>, queries?: Array<URLParamType>): string => {
    if(params) {
        params.forEach((param: URLParamType): void => {
            url = url.replace(`{${param.param}}`, `${encodeURIComponent(param.value.toString())}`);
        });
    }

    if(queries) {
        let i: number = 0;

        queries.forEach((query: URLParamType): void => {
            if(i === 0) url = `${url}?${query.param}=${query.value}`;
            else url = `${url}&${query.param}=${query.value}`;
            i++;
        });
    }

    return url;
};

export const getRequest = async (url: string, pub: boolean = false, retry: boolean = true): Promise<ResponseType> => {
    try {
        const response: Response = await fetch(url, {headers: await buildHeaders(pub)});

        if (!response.ok) {

            if(response.status === 401 && retry) {
                const retry: boolean = await handle401();
                if(retry) await getRequest(url, pub, false);
            }

            return {status: false, message: response.statusText, data: null};
        }

        const data = await response.json();

        return {status: true, message: "", data};
    } catch (error) {
        log("GET request error", {url, error});
    }

    return {status: false, message: "ERR_NETWORK", data: null};
};

export const postRequest = async (url: string, body: object, pub: boolean = false, file: boolean = false, retry: boolean = true): Promise<ResponseType> => {
    try {
        const response: Response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: await buildHeaders(pub, file)
        });

        if (!response.ok) {

            if(response.status === 401 && retry) {
                const retry: boolean = await handle401();
                if(retry) await postRequest(url, body, pub, file, false);
            }

            return {status: false, message: response.statusText, data: null};
        }

        const data = await response.json();

        return {status: true, message: "", data};
    } catch (error) {
        log("POST request error", {url, error});
    }

    return {status: false, message: "ERR_NETWORK", data: null};
}

export const putRequest = async (url: string, body: object, pub: boolean = false, file: boolean = false, retry: boolean = true): Promise<ResponseType> => {
    try {
        const response: Response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: await buildHeaders(pub, file)
        });

        if (!response.ok) {

            if(response.status === 401 && retry) {
                const retry: boolean = await handle401();
                if(retry) await putRequest(url, body, pub, file, false);
            }

            return {status: false, message: response.statusText, data: null};
        }

        const data = await response.json();

        return {status: true, message: "", data};
    } catch (error) {
        log("PUT request error", {url, error});
    }

    return {status: false, message: "ERR_NETWORK", data: null};
}

export const patchRequest = async (url: string, body: object, pub: boolean = false, file: boolean = false, retry: boolean = true): Promise<ResponseType> => {
    try {
        const response: Response = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: await buildHeaders(pub, file)
        });

        if (!response.ok) {

            if(response.status === 401 && retry) {
                const retry: boolean = await handle401();
                if(retry) await patchRequest(url, body, pub, file, false);
            }

            return {status: false, message: response.statusText, data: null};
        }

        const data = await response.json();

        return {status: true, message: "", data};
    } catch (error) {
        log("PATCH request error", {url, error});
    }

    return {status: false, message: "ERR_NETWORK", data: null};
}

export const deleteRequest = async (url: string, pub: boolean = false, retry: boolean = true): Promise<ResponseType> => {
    try {
        const response: Response = await fetch(url, {method: "DELETE", headers: await buildHeaders(pub)});

        if (!response.ok) {

            if(response.status === 401 && retry) {
                const retry: boolean = await handle401();
                if(retry) await deleteRequest(url, pub, false);
            }

            return {status: false, message: response.statusText, data: null};
        }

        const data = await response.json();

        return {status: true, message: "", data};
    } catch (error) {
        log("DELETE request error", {url, error});
    }

    return {status: false, message: "ERR_NETWORK", data: null};
}

const buildHeaders = async (pub: boolean, file: boolean = false): Promise<Headers> => {
    const headers: Headers = new Headers({"content-Type": "application/json"});

    if(!pub) {
        const {accessToken} = getLocaleStorageItem('access-token') as {accessToken: string};
        if(accessToken) headers.set("authorization", accessToken);
    }

    if(file) {
        headers.set("content-type", "multipart/-data");
    }

    return headers;
};

const handle401 = async (): Promise<boolean> => {
    try {
        const {refreshToken} = getLocaleStorageItem('refresh-token') as {refreshToken: string};

        if(refreshToken) {
            const response: ResponseType = await postRequest(apiV1URL(ROUTES_API.AUTH.REFRESH), {token: refreshToken}, true);

            if(response.status) {
                const {user, tokens} = response.data as RefreshTokenResponseType;

                if(user && tokens) {
                    const {accessToken, refreshToken} = tokens;

                    setLocaleStorageItem("user", user);
                    setLocaleStorageItem("access-token", {accessToken});
                    setLocaleStorageItem("refresh-token", {refreshToken});

                    return true;
                }
            }
        }
    } catch (e) {
        log("Xhr refresh token request error", {e});

        removeAllLocaleStorageItems();

        window.location.reload();
    }

    return false;
};