import getConfig from "next/config";
import { LoginEntity } from "@/src/domain/entity/login-entity";
import { Endpoint } from "@/src/helpers/constant/endpoint";
import { fetchWrapper } from "../../helpers/fetch-wrapper";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}${Endpoint.login}`;
const lsifBaseUrl = `${publicRuntimeConfig.lsifApiUrl}`;

const login = async (loginEntity: LoginEntity) => {
    const response = fetchWrapper.auth(`${lsifBaseUrl}/login/post`, loginEntity);
    return response;
};

const refreshLogin = async (refreshToken: string) => {
    const response = fetchWrapper.auth(`${baseUrl}refresh/`, {
        refresh: refreshToken,
    });
    return response;
};

const getDomain = async (username: string) => {
    const response = fetchWrapper.auth(
        `${lsifBaseUrl}login/getdomain?username=${username}`,
        {}
    );
    return response;
};

export const AuthService = {
    login,
    refreshLogin,
    getDomain,
};
