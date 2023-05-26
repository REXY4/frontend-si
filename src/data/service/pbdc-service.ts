import getConfig from "next/config";
import { Endpoint } from "@/src/helpers/constant/endpoint";
import { fetchWrapper } from "../../helpers/fetch-wrapper";
import { PbdcActionType } from "../action-type/pbdc-action-type";
import { appStoreImplementation } from "../store-implementation/app-store-implementation";
import { FormDetailItemPbdc, PbdcEntity } from "@/src/domain/entity/pbdc-entity";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/${Endpoint.pbdc}`;
const authStore = appStoreImplementation.getState().auth;
const pToken = authStore?.auth?.token;

const getPerStore = async (store_code: string) => {
        const response = fetchWrapper.get(
            PbdcActionType.GET_PER_STORE,
            `${baseUrl}/all?store_code=${store_code}&pToken=${pToken}&fromCache=false`
        );
        return response;
};

const getOverviewPbdc = async (store_code:string, dc :string, noPb : string) => {
    const response = fetchWrapper.get(
        PbdcActionType.GET_DETAIL,
        `${baseUrl}/GetOverview?store_code=${store_code}&NoPb=${noPb}&dc=${dc}&pToken=${pToken}`,
    );
    return response;
};

const postCheckPbdcRosso = async (store_code:string) => {
    const response = fetchWrapper.post(
        PbdcActionType.CHECK_ROSSO,
        `${baseUrl}/PostPbdcCheckRosso?store_code=${store_code}&pToken=${pToken}`,
        { store_code }
    );
    return response;
};

const postPluValidation = async (store:string, barcode:string, dc:string) => {
    const response = fetchWrapper.post(
        PbdcActionType.PLU_VALIDATION,
        `${baseUrl}/PostPluValidation?pToken=${pToken}`,
        { store, barcode, dc }
    );
    return response;
};

const postPbdcVerify = async (
        store_code:string,
        noPb:string,
        dc:string,
        detailItemPbdc : any
) => {
    const response = fetchWrapper.post(
        PbdcActionType.PBDC_VERIFY,
        `${baseUrl}/PostVerify?pToken=${pToken}`,
        {
             store_code,
             noPb,
              dc,
            detailItemPbdc: detailItemPbdc.map((item:any) => {
            return {
                nour: item.fdnour,
                plu: item.plu,
                eq: item.eq,
                order: item.order
            };
        })
        }
    );

    return response;
};

const postPbdcSaveData = async (
        store_code:string,
        noPb:string,
        dc:string,
        detailItemPbdc : [FormDetailItemPbdc]
) => {
    const response = fetchWrapper.post(
        PbdcActionType.PBDC_SAVE_DATA,
        `${baseUrl}/SaveDataPbdc?pToken=${pToken}`,
        {
        store_code,
        noPb,
        dc,
        detailItemPbdc: detailItemPbdc.map((item:any) => {
            return {
                nour: item.nour,
                plu: item.plu,
                eq: item.eq,
                order: item.order
            };
        })
        }
    );
    return response;
};

const save = async (request: PbdcEntity) => fetchWrapper.post(
        PbdcActionType.SAVE,
        `${baseUrl}post?pToken=${pToken}`,
        {
            id: request?.id,
            dc: request?.dc,
            cab: request?.cab,
            details: request?.details,
            nopb: request?.nopb,
            pToken: pToken,
            status: request?.status,
            tipe: request?.tipe,
        }
    );

export const PbdcService = {
    postCheckPbdcRosso,
    getOverviewPbdc,
    postPluValidation,
    getPerStore,
    postPbdcVerify,
    postPbdcSaveData,
    save,
};
