/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginEntity } from "@/src/domain/entity/login-entity";
import { AuthStore } from "@/src/domain/store/auth-store";
import { AuthAction } from "../action/auth-action";
import { AuthStoreState } from "../reducer/auth-reducer";
import type { AppRootState } from "./app-store-implementation";

const authSelector = (state: AppRootState) => state.auth;

const authStoreImplementation = (): AuthStore => {
    const { auth, validation, status } = useSelector<
        AppRootState,
        AuthStoreState
    >(authSelector);
    const dispatch = useDispatch();

    // overidde from store
    const authLogin = useCallback(
        (loginEntity: LoginEntity) => AuthAction.loginAction(loginEntity)(dispatch),
        [dispatch]
    );
    const logout = useCallback(
        () => AuthAction.logoutAction()(dispatch),
        [dispatch]
    );
    const authRefreshToken = useCallback(
        (refreshToken: string) => AuthAction.refreshLoginAction(refreshToken)(dispatch),
        [dispatch]
    );

    const getDomain = useCallback(
        (username: string) => AuthAction.getDomainAction(username)(dispatch),
        [dispatch]
    );

    return {
        auth,
        validation,
        status,
        authLogin,
        logout,
        authRefreshToken,
        getDomain,
    };
};

export { authStoreImplementation, authSelector };
