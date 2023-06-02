import getConfig from "next/config";
import { fetchWrapper } from "@/src/helpers/fetch-wrapper";
import { PbSuplActionType } from "../action-type/pbsupl-action-type";
import { Endpoint } from "@/src/helpers/constant/endpoint";
import { authStoreImplementation } from "../store-implementation/auth-store-implementation";
import { appStoreImplementation } from "../store-implementation/app-store-implementation";
import { PbSuppPluValidationRequestEntity, PbSuppQtyOrderRequestEntity, PbSuppRequestSaveDataEntity } from "@/src/domain/entity/pbsupl-entity";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/${Endpoint.pbsupl}`;
const authStore = appStoreImplementation.getState().auth;
const pToken = authStore?.auth?.token;

const getAllDataPbSupllierService = async (store: string) => {
        const response = fetchWrapper.get(
            PbSuplActionType.PB_SUP_GET_ALL,
            `${baseUrl}/getlist?store=${store}`
        );
        return response;
};

const ServicePbSuppOverview = async (store:string, noPb:string) => {
    const response = fetchWrapper.get(
        PbSuplActionType.PB_SUP_GET_OVERVIEW,
        `${baseUrl}/overview?store=${store}&noPb=${noPb}`
    );
    return response;
};

const ServicePbSuppCheckRosso = async (store:string) => {
     const response = fetchWrapper.get(
        PbSuplActionType.PB_SUP_CHECK_ROSSO,
        `${baseUrl}/checkRosso?store_code=${store}`
    );
    return response;
};

const ServicePbSuppPluValidation = async (data:PbSuppPluValidationRequestEntity) => {
     const response = fetchWrapper.post(
        PbSuplActionType.PB_SUP_PLU_VALIDATION,
        `${baseUrl}/pluvalidation`,
        { ...data }
    );
    return response;
};

const ServicePbSuppQtyOrderValidation = async (data:PbSuppQtyOrderRequestEntity) => {
     const response = fetchWrapper.post(
        PbSuplActionType.PB_SUP_QTY_ORDER_VALIDATION,
        `${baseUrl}/qtyordervalidation`,
        { ...data }
    );
    return response;
};

const ServicePbSuppSave = async (data:PbSuppRequestSaveDataEntity) => {
     const response = fetchWrapper.post(
        PbSuplActionType.PB_SUP_SAVE,
        `${baseUrl}/save`,
        { ...data }
    );
    return response;
};

const ServicePbSuppVerify = async (data:PbSuppRequestSaveDataEntity) => {
     const response = fetchWrapper.post(
        PbSuplActionType.PB_SUP_VERIFY,
        `${baseUrl}/verify`,
        { ...data }
    );
    return response;
};

export const PbSuplService = {
    getAllDataPbSupllierService,
    ServicePbSuppOverview,
    ServicePbSuppCheckRosso,
    ServicePbSuppPluValidation,
    ServicePbSuppQtyOrderValidation,
    ServicePbSuppSave,
    ServicePbSuppVerify
};
