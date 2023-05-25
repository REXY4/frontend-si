/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { AuthActionType } from "@/src/data/action-type/auth-action-type";
import { SettingActionType } from "../data/action-type/settting-action-type";
import { appStoreImplementation } from "@/src/data/store-implementation/app-store-implementation";
import { AuthRepository } from "@/src/domain/repository/auth-repository";
import { DefaultValue } from "./constant/default-value";
import { ResponseStatus } from "./constant/response-status";
import { Utils } from "./utils";

const auth = async (url: string, body: any) => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };
    return fetch(url, requestOptions).then((data) => handleResponse(data));
};

const refreshToken = async () => {
    const response: any = await AuthRepository.refreshLogin(
        appStoreImplementation.getState().auth?.auth?.refresh ?? ""
    );
    appStoreImplementation.dispatch({
        type: AuthActionType.REFRESH_LOGIN,
        payload: response,
    });

    return response;
};

const get = async (
    actionType: string,
    url: string,
    callDispatch?: boolean,
    isDownload?: boolean
) => {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    const response = await fetch(url, requestOptions).then((value) => handleResponse(value, isDownload));
    if (callDispatch) {
 appStoreImplementation.dispatch({
            type: actionType,
            payload: response,
        });
}
    if (response != ResponseStatus.Unauthorized) return response;

    const result = await refreshToken();
    if (result?.status?.code == ResponseStatus.Success) { get(actionType, url, true); }
};

const download = async (actionType: string, url: string, filename: string) => {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    await fetch(url, requestOptions)
        .then((response) => response.blob())
        .then((blob) => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.href = url;
            a.download = `${filename}.csv`;
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove(); // afterwards we remove the element again
        });
};

const post = async (
    actionType: string,
    url: string,
    body: any,
    callDispatch?: boolean
) => {
    delete body.id;
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(body),
    };
    try {
        const response = await fetch(url, requestOptions).then(handleResponse);
        if (callDispatch) {
             appStoreImplementation.dispatch({
                type: actionType,
                payload: response,
            });
        }
        if (response != ResponseStatus.Unauthorized) return response;
    } catch (e) {
        appStoreImplementation.dispatch({
            type: SettingActionType.SET_LOADING,
            isLoading: false,
        });
        appStoreImplementation.dispatch({
            type: actionType,
            payload: DefaultValue.EmptyResponse,
        });
    }
};

const postWithAttachFile = async (
    actionType: string,
    url: string,
    formData: FormData,
    callDispatch?: boolean
) => {
    const requestOptions = {
        method: "POST",
        headers: authHeader(true),
        body: formData,
    };
    try {
        const response = await fetch(url, requestOptions).then(handleResponse);

        if (callDispatch) {
 appStoreImplementation.dispatch({
                type: actionType,
                payload: response,
            });
}
        if (response != ResponseStatus.Unauthorized) return response;

        const result = await refreshToken();
        if (result?.status?.code == ResponseStatus.Success) { postWithAttachFile(actionType, url, formData, true); }
    } catch (e) {
        appStoreImplementation.dispatch({
            type: SettingActionType.SET_LOADING,
            isLoading: false,
        });
        appStoreImplementation.dispatch({
            type: actionType,
            payload: DefaultValue.EmptyResponse,
        });
    }
};

const put = async (
    actionType: string,
    url: string,
    body: any,
    callDispatch?: boolean
) => {
    delete body.id;
    const requestOptions = {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(body),
    };
    const response = await fetch(url, requestOptions).then(handleResponse);

    if (callDispatch) {
 appStoreImplementation.dispatch({
            type: actionType,
            payload: response,
        });
}
    if (response != ResponseStatus.Unauthorized) return response;

    const result = await refreshToken();
    if (
        result?.status?.code == ResponseStatus.Success
        || result?.status?.code == ResponseStatus.SuccessNoContent
    ) { put(actionType, url, body, true); }
};

// prefixed with underscored because delete is a reserved word in javascript
const _delete = async (
    actionType: string,
    url: string,
    callDispatch?: boolean
) => {
    const requestOptions = {
        method: "DELETE",
        headers: authHeader(),
    };
    const response = await fetch(url, requestOptions).then(handleResponse);

    if (callDispatch) {
 appStoreImplementation.dispatch({
            type: actionType,
            payload: Utils.getIdFromApiUrl(url),
        });
}

    if (response != ResponseStatus.Unauthorized) return response;

    const result = await refreshToken();
    if (result?.status?.code == ResponseStatus.Success) { put(actionType, url, true); }
};

const authHeader = (isMultipartForm?: boolean) => {
    const authStore = appStoreImplementation.getState().auth;
    const header = {
        Authorization: `Bearer ${authStore.auth?.token ?? ""}`,
    };
    return isMultipartForm
        ? header
        : {
              ...header,
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers":
                  "Origin, X-Requested-With, Content-Type, Accept",
          };
};

const handleResponse = (response: any, isDownload?: boolean) => response.text().then((text: any) => {
        const data = isDownload ? text : text && JSON.parse(text);
        const appendData = {
            ...data,
            status: {
                code: response.status,
                message: data?.status?.message,
                isError: false,
            },
        };
        if ([ResponseStatus.Unauthorized].includes(response.status)) {
            return ResponseStatus.Unauthorized;
        }
        if (!response.ok) {
            const errorData = {
                ...appendData,
                status: {
                    ...appendData.status,
                    isError: true,
                },
            };
            Promise.reject(ResponseStatus.Unauthorized);
            return errorData;
        }
        return appendData;
    });

export const fetchWrapper = {
    auth,
    get,
    post,
    put,
    delete: _delete,
    postWithAttachFile,
    download,
};
