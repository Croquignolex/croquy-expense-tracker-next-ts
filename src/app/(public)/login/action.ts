"use server";

import {redirect} from "next/navigation";

import {AlertStatusEnum} from "@/lib/enums";
import {apiV1URL, postRequest, ResponseType} from "@/lib/request";
import {ROUTES_API, ROUTES_APP} from "@/constants/routes";
import {ErrorAlertType} from "@/lib/types";

export type LoginFormData = {
    username: string;
    password: string;
    alert: ErrorAlertType;
};

export async function loginAction(prevState: LoginFormData, queryData: FormData) {
    const username: FormDataEntryValue = queryData.get('username');
    const password: FormDataEntryValue = queryData.get('password');

    let alert: ErrorAlertType = {show: false};

    const response: ResponseType = await postRequest(apiV1URL(ROUTES_API.AUTH.LOGIN), {username, password}, true);

    if(response.status) redirect(ROUTES_APP.HOME);
    else alert = {show: true, message: response.message, status: AlertStatusEnum.ERROR};

    return  {...prevState, alert};
}