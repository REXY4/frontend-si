import getConfig from "next/config";
import { Endpoint } from "@/src/helpers/constant/endpoint";
import { fetchWrapper } from "@/src/helpers/fetch-wrapper";
import { appStoreImplementation } from "../store-implementation/app-store-implementation";
import { DcActionType } from "../action-type/dc-action-type";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/${Endpoint.dc}`;
const authStore = appStoreImplementation.getState().auth;
const pToken = authStore?.auth?.token;

const getAllDc = async (store_code: string) => {
        const response = fetchWrapper.get(
            DcActionType.GET_ALL,
            `${baseUrl}/All?pToken=${pToken}&store_code=${store_code}&fromCache=false`
        );
        return response;
};

const DcService = {
   getAllDc
};

export {
    DcService
};
