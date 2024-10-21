"use client";

import axios, {InternalAxiosRequestConfig, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

import {getLocaleStorageItem, removeAllLocaleStorageItems, setLocaleStorageItem} from "@/helpers/localStorage";
import {TokenType, URLParamType} from "@/lib/types";
import {LoginActionPayloadType} from "@/lib/context";
import {ROUTES_API} from "@/constants/routes";
import {ENV_API} from "@/constants/configs";
import {log} from "@/helpers/general";

const API_V1_URL: string = `${ENV_API.baseURL}/api/v1/backoffice`;
const API_V2_URL: string = `${ENV_API.baseURL}/api/v2/backoffice`;
export const API_MEDIA_V1_URL: string = `${ENV_API.baseURL}/api/v1/media/`;
export const API_SELECT_V1_URL: string = `${ENV_API.baseURL}/api/v1/select`;

const axiosApiInstance: AxiosInstance = axios.create({timeout: 30000});

axiosApiInstance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
    config.headers["content-type"] = "application/json";

    if(!config.headers["public"]) {
        const {accessToken} = getLocaleStorageItem("access-token") as { accessToken: string };

        if(accessToken) {
            config.headers["authorization"] = `Bearer ${accessToken}`;
        }
    }

    if(config.headers["file"]) {
        config.headers["content-type"] = "multipart/-data";
    }

    return config;
}, error => Promise.reject(error));

axiosApiInstance.interceptors.response.use((response: AxiosResponse<any, any>) => {
    return response
}, async (error: any): Promise<AxiosResponse<any, any>> => {
    if(error.response) {
        const originalRequest: any = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const {refreshToken} = getLocaleStorageItem("refresh-token") as { refreshToken: string };

                if(refreshToken) {
                    const response: AxiosResponse<any, any> = await postRequest(v1URL(ROUTES_API.auth.refresh), {token: refreshToken}, {headers: {public: true}});

                    if(response.data) {
                        const {accessToken, refreshToken} = response.data as TokenType;

                        const payload: LoginActionPayloadType = response.data as LoginActionPayloadType;

                        setLocaleStorageItem("user", payload);
                        setLocaleStorageItem("access-token", {accessToken});
                        setLocaleStorageItem("refresh-token", {refreshToken});

                        return axiosApiInstance(originalRequest);
                    }
                }
            } catch (e) {
                log("Xhr refresh token request error", {e});

                removeAllLocaleStorageItems();

                window.location.reload();
            }
        }
    }
    return Promise.reject(error);
});

// Build v1 url
export const v1URL = (url: string, params?: Array<URLParamType>, queries?: Array<URLParamType>): string => {
    return joinBaseUrlWithParams(API_V1_URL + url, params, queries);
};

// Build v2 url
export const v2URL = (url: string, params?: Array<URLParamType>, queries?: Array<URLParamType>): string => {
    return joinBaseUrlWithParams(API_V2_URL + url, params, queries);
};

// Build complete url
export const joinBaseUrlWithParams = (url: string, params?: Array<URLParamType>, queries?: Array<URLParamType>): string => {
    if(params) {
        params.forEach((param: URLParamType): void => {
            url = url.replace(`{${param.param}}`, `${encodeURIComponent(param.value)}`);
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

export const getRequest = async (url: string, config?: AxiosRequestConfig<any>): Promise<any> => {
    return axiosApiInstance.get(url, config);
};

export const postRequest = async (url: string, data?: object, config?: AxiosRequestConfig<any>): Promise<any> => {
    return axiosApiInstance.post(url, data, config);
};

export const putRequest = async (url: string, data?: object, config?: AxiosRequestConfig<any>): Promise<any> => {
    return axiosApiInstance.put(url, data, config);
};

export const patchRequest = async (url: string, data?: object, config?: AxiosRequestConfig<any>): Promise<any> => {
    return axiosApiInstance.patch(url, data, config);
};

export const deleteRequest = async (url: string, config?: AxiosRequestConfig<any>): Promise<any> => {
    return axiosApiInstance.delete(url, config);
};