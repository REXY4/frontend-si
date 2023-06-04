import { PbPoCanvasListResponseEntity, PbPoCanvasSaveRequest } from "@/src/domain/entity/pb-pocanvas-entity";
import { PbPoCanvasRepository } from "@/src/domain/repository/pb-pocanvas-repository";
import { Dispatch } from "redux";
import { PbPoCanvasActionType } from "../action-type/pb-pocanvas-type";
import { AlertActionType } from "../action-type/alert-action-type";

const getList = (store:string) => async (dispatch:Dispatch) => {
    try{
        const response = await PbPoCanvasRepository.getList(store);
        if(response.returnType === "S") {
            dispatch({
                type: PbPoCanvasActionType.PB_POC_GET_LIST,
                payload: response.returnData
            });
        }else{
           dispatch({
                type: PbPoCanvasActionType.PB_POC_GET_LIST,
                payload: response.returnData
            });
        }
    }catch(err) {
         dispatch({
                type: AlertActionType.SET_ALERTS,
                isOpen: true,
                message: "Get Data Fail!"
            });
    }
};

const getOverview = (store:string, NoUo:string) => async (dispatch:Dispatch) => {
    try{
        const response = await PbPoCanvasRepository.getOverview(store, NoUo);
        if(response.returnType === "S") {
            dispatch({
                type: PbPoCanvasActionType.PB_POC_GET_OVERVIEW,
                payload: response.returnData
            });
        }else{
           dispatch({
                type: PbPoCanvasActionType.PB_POC_GET_OVERVIEW,
                payload: response.returnData
            });
        }
    }catch(err) {
        dispatch({
            type: AlertActionType.SET_ALERTS,
            isOpen: true,
            message: "Get data Fail!"
        });
    }
};

const pluValidation = (store:string, plu:string) => async (dispatch:Dispatch) => {
    try{
        const response = await PbPoCanvasRepository.pluValidation(store, plu);
        if(response.returnType === "S") {
            dispatch({
                type: PbPoCanvasActionType.PB_POC_PLU_VALIDATION,
                payload: response.returnData
            });
        }else{
            dispatch({
                type: PbPoCanvasActionType.PB_POC_PLU_VALIDATION,
                payload: response.returnData
            });
        }
    }catch(err) {
        dispatch({
            type: AlertActionType.SET_ALERTS,
            isOpen: true,
            message: "Validasi Plu Gagal!"
        });
    }
};

const saveData = (body:PbPoCanvasSaveRequest) => async (dispatch:Dispatch) => {
    try{
        const response = await PbPoCanvasRepository.saveData(body);
        if(response.returnType === "S") {
            dispatch({
                type: PbPoCanvasActionType.PB_POC_SAVE_DATA,
                payload: response.returnData
            });
        }else{
            dispatch({
                type: PbPoCanvasActionType.PB_POC_SAVE_DATA,
                payload: response.returnData
            });
        }
    }catch(err) {
        dispatch({
            type: AlertActionType.SET_ALERTS,
            isOpen: true,
            message: "Save Data Gagal!"
        });
    }
};

const addDataToDraft = (data:PbPoCanvasListResponseEntity) => async (dispatch:Dispatch) => {
    dispatch({
        type: PbPoCanvasActionType.PB_POC_ADD_DRAFT,
        payload: data
    });
};

const editDataFromDraft = (data:PbPoCanvasListResponseEntity) => async (dispatch:Dispatch) => {
    dispatch({
        type: PbPoCanvasActionType.PB_POC_EDIT_DRAFT,
        payload: data
    });
};

const delDataFromDraft = (noUo:string) => async (dispatch:Dispatch) => {
    dispatch({
        type: PbPoCanvasActionType.PB_POC_EDIT_DRAFT,
        payload: noUo
    });
};

const clearAllDataInDraft = () => async (dispatch:Dispatch) => {
     dispatch({
        type: PbPoCanvasActionType.PB_POC_EDIT_DRAFT,
    });
};

export const PbPoCanvasAction = {
    getList,
    getOverview,
    pluValidation,
    saveData,
    addDataToDraft,
    editDataFromDraft,
    delDataFromDraft,
    clearAllDataInDraft
};
