import getConfig from "next/config";
import { Endpoint } from "@/src/helpers/constant/endpoint";
import { appStoreImplementation } from "../store-implementation/app-store-implementation";
import { fetchWrapper } from "@/src/helpers/fetch-wrapper";
import { PbPoCanvasActionType } from "../action-type/pb-pocanvas-type";
import { stringify } from "querystring";
import { PbPoCanvasSaveRequest } from "@/src/domain/entity/pb-pocanvas-entity";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/${Endpoint.dc}`;
const authStore = appStoreImplementation.getState().auth;
const pToken = authStore?.auth?.token;

const getList = (store_code:string) => {
     const response = fetchWrapper.get(
            PbPoCanvasActionType.PB_POC_GET_LIST,
            `${baseUrl}/getlist?store=${store_code}`
        );
    return response;
};

const getOverview = (store_code:string, noUo:string) => {
    const response = fetchWrapper.get(
            PbPoCanvasActionType.PB_POC_GET_OVERVIEW,
            `${baseUrl}/overview?store=${store_code}&NoUo=${noUo}`
        );
    return response;
};

const pluValidation = (store:string, plu:string) => {
    const response = fetchWrapper.post(
            PbPoCanvasActionType.PB_POC_PLU_VALIDATION,
            `${baseUrl}/pluvalidation`,
            { store, plu }
        );
    return response;
};

const saveData = (body:PbPoCanvasSaveRequest) => {
    const response = fetchWrapper.post(
            PbPoCanvasActionType.PB_POC_PLU_VALIDATION,
            `${baseUrl}/save`,
            { ...body }
        );
    return response;
};

export const PbPoCanvasService = {
    getList,
    getOverview,
    pluValidation,
    saveData
};
