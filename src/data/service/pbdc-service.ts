import getConfig from "next/config";
import { Endpoint } from "@/src/helpers/constant/endpoint";
import { fetchWrapper } from "../../helpers/fetch-wrapper";
import { PbdcActionType } from "../action-type/pbdc-action-type";
import { appStoreImplementation } from "../store-implementation/app-store-implementation";
import { PbdcEntity } from "@/src/domain/entity/pbdc-entity";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}${Endpoint.pbdc}`;
const authStore = appStoreImplementation.getState().auth;
const pToken = authStore?.auth?.token;

const getPerStore = async (store_code: string) => {
    try {
        const response = fetchWrapper.get(
            PbdcActionType.GET_PER_STORE,
            `${baseUrl}all?store_code=${store_code}&pToken=${pToken}&fromCache=true`
        );
        return response;
    } catch (err) {
        window.location.href = "/login";
    }
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
    getPerStore,
    save,
};
