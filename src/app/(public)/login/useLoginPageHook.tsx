"use client";

import {useContext, useState} from "react";
import {useTranslations} from "next-intl";

import { useToast } from "@/hooks/use-toast";
import {ContextType, ErrorAlertType, TokenType} from "@/lib/types";
import {LoginActionPayloadType, RootContext} from "@/lib/context";
import {useMutation} from "@tanstack/react-query";
import {errorAlert, log} from "@/helpers/general";
import {setLocaleStorageItem} from "@/helpers/localStorage";
import {globalActionTypes} from "@/constants/actions";
import {postRequest, apiV1URL} from "@/helpers/request";
import {ROUTES_API} from "@/constants/routes";

export type LoginFormType = {
    email: string,
    password: string
};

type LoginRequestDataType = {
    email: string,
    password: string
};

export type LoginPageHookType = {
    handleLogin: (a: LoginFormType) => void,
    isLoginPending: boolean,
    loginAlertData: ErrorAlertType
};

export default function useLoginPageHook(): LoginPageHookType {
    const [loginAlertData, setLoginAlertData] = useState<ErrorAlertType>({show: false});

    const {toast} = useToast();
    const t = useTranslations();

    const context: ContextType = useContext(RootContext) as ContextType;

    const loginResponse = useMutation({
        mutationFn: ({email, password}: LoginRequestDataType) => {
            const url: string = apiV1URL(ROUTES_API.auth.login);

            return postRequest(url, {email, password}, {headers: {public: true}});
        },
        onError: (error): void => {
            const e: ErrorAlertType = errorAlert(error);

            setLoginAlertData({...e, message: t(e.message)});

            log("Login failure", error);
        },
        onSuccess: (data): void => {
            setLoginAlertData({show: false});

            const {accessToken, refreshToken} = data.data as TokenType;
            const payload: LoginActionPayloadType = data.data as LoginActionPayloadType;

            setLocaleStorageItem('user', payload);
            setLocaleStorageItem('access-token', {accessToken});
            setLocaleStorageItem('refresh-token', {refreshToken});

            context.globalDispatch({type: globalActionTypes.LOGIN, payload});

            toast({
                title: t("login.authentication"),
                description: t("login.welcome", {firstName: payload.firstName})
            });
        }
    });

    const handleLogin = ({email, password}: LoginFormType): void => {
        setLoginAlertData({show: false});

        loginResponse.mutate({email, password});
    }

    const isLoginPending: boolean = loginResponse.isPending;

    return { handleLogin, isLoginPending, loginAlertData };
};

