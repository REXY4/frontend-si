import { setCookies, deleteCookie } from "cookies-next";
import type { AnyAction } from "redux";
import { AuthStore } from "@/src/domain/store/auth-store";
import { AuthActionType } from "../action-type/auth-action-type";

type AuthStoreState = Omit<
    AuthStore,
    "authLogin" | "logout" | "authRefreshToken" | "getDomain"
>;

const INITIAL_STATE:any = {
    auth: undefined,
    validation: undefined,
    status: undefined,
};

const authReducer = (
    state: AuthStoreState = INITIAL_STATE,
    action: AnyAction
) => {
    switch (action.type) {
        case AuthActionType.AUTH_LOGIN:
            if (action.payload.returnType === "S") {
                setCookies("token", action.payload.returnData.token);
            }
            return {
                ...state,
                auth: action.payload.returnData,
            };
        case AuthActionType.LOGOUT:
            deleteCookie("token");
            return {
                ...INITIAL_STATE
            };
        case AuthActionType.REFRESH_LOGIN:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    access: action.payload.returnData,
                },
            };
        case AuthActionType.GET_DOMAIN:
            return {
                ...state,
                auth: action?.payload?.data,
            };
        default:
            return state;
    }
};

export { authReducer };
export type { AuthStoreState };
