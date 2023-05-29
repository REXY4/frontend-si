import getConfig from "next/config";
import { fetchWrapper } from "@/src/helpers/fetch-wrapper";
import { PbSuplActionType } from "../action-type/pbsupl-action-type";
import { Endpoint } from "@/src/helpers/constant/endpoint";
import { authStoreImplementation } from "../store-implementation/auth-store-implementation";
import { appStoreImplementation } from "../store-implementation/app-store-implementation";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/${Endpoint.pbsupl}`;
const authStore = appStoreImplementation.getState().auth;
const pToken = authStore?.auth?.token;

const getAllDataPbSupllierService = async (store: string) => {
    console.log("success get all pb suplier");
        const response = fetchWrapper.get(
            PbSuplActionType.GET_ALL,
            `${baseUrl}/getlist?store=${store}`
        );
        return response;
};

export const PbSuplService = {
    getAllDataPbSupllierService
};
