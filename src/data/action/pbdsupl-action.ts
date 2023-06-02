import { PbSuplRepository } from '@/src/domain/repository/pbsupl-repository';
import { Dispatch } from 'redux';
import { PbSuplActionType } from '../action-type/pbsupl-action-type';
import {
 PbSuppOverviewEntity, PbSuppPluValidationRequestEntity, PbSuppQtyOrderRequestEntity, PbSuppRequestSaveDataEntity
} from '@/src/domain/entity/pbsupl-entity';
import { AlertActionType } from '../action-type/alert-action-type';
import { SettingActionType } from '../action-type/settting-action-type';

const getAllDataPbSuplAction = (store:string) => async (dispatch:Dispatch) => {
        const response = await PbSuplRepository.getAllPbSuplRepository(store);
        if(response.returnType === "S") {
            dispatch({
                type: PbSuplActionType.PB_SUP_GET_ALL,
                payload: response.returnData
            });
        }else{
            dispatch({
                type: PbSuplActionType.PB_SUP_GET_ALL,
                payload: response.returnData
            });
        }
};

const overview = (data:PbSuppOverviewEntity, store:string, noPb:string) => async (dispatch:Dispatch) => {
    try{
        const response = await PbSuplRepository.RepositoryPbSuppOverview(store, noPb);
        if(response.returnType === "S") {
            dispatch({
                type: PbSuplActionType.PB_SUP_GET_OVERVIEW,
                detailData: data,
                overview: response.returnData
            });
        }else{
            dispatch({
                type: PbSuplActionType.PB_SUP_GET_OVERVIEW,
                detailData: data,
                overview: response.returnData
            });
        }
    }catch(err) {
        dispatch({
                type: PbSuplActionType.PB_SUP_GET_OVERVIEW,
                detailData: data,
                overview: []
        });
    }
};

// const checkRosso = () =>async (dispatch:Dispatch) =>{

// }

const checkRosso = (store:string) => async (dispatch:Dispatch) => {
    try{
        const response = await PbSuplRepository.checkRosso(store);
        if(response.returnType === "S") {
            dispatch({
                type: PbSuplActionType.PB_SUP_CHECK_ROSSO,
                messageAlert: response.returnData.message,
                status: response.returnData.status
            });
        }else{
            dispatch({
                type: PbSuplActionType.PB_SUP_CHECK_ROSSO,
                messageAlert: response.returnData.message,
                status: response.returnData.status
            });
        }
    }catch(err) {
        dispatch({
                type: PbSuplActionType.PB_SUP_CHECK_ROSSO,
                messageAlert: 'Error To check Rosso !',
                status: 2
            });
    }
};

const pluValidation = (data:PbSuppPluValidationRequestEntity) => async (dispatch:Dispatch) => {
    try{
        const response = await PbSuplRepository.pluValidation(data);
        if(response.returnType === "S") {
            dispatch({
                type: SettingActionType.SET_LOADING,
                isLoading: false
            });
            dispatch({
                type: AlertActionType.SET_ALERTS,
                isOpen: true,
                message: response.returnData.message
            });
            dispatch({
                type: PbSuplActionType.PB_SUP_PLU_VALIDATION,
                messageAlert: response.returnData.message,
                status: response.returnData.status,
                pluData: response.returnData
            });
        }else{
            dispatch({
                type: SettingActionType.SET_LOADING,
                isLoading: false
            });
            dispatch({
                type: AlertActionType.SET_ALERTS,
                isOpen: true,
                message: response.returnData.message
            });
             dispatch({
                type: PbSuplActionType.PB_SUP_PLU_VALIDATION,
                messageAlert: response.returnData.message,
                status: response.returnData.status,
                pluData: response.returnData
            });
        }
    }catch(err) {
          dispatch({
                type: AlertActionType.SET_ALERTS,
                isOpen: true,
                message: 'Plu Validation Failed!'
            });
        dispatch({
                type: PbSuplActionType.PB_SUP_PLU_VALIDATION,
                messageAlert: 'Plu Validation Failed!',
                status: 1,
                pluData: undefined
            });
    }
 };

const addOverviewDraft = (data:PbSuppOverviewEntity) => (dispatch:Dispatch) => {
     dispatch({
        type: PbSuplActionType.PB_SUP_ADD_OVERVIEW_DRAFT,
        payload: data
    });
};

const editOverviewDraft = (data:PbSuppOverviewEntity) => (dispatch:Dispatch) => {
     dispatch({
        type: PbSuplActionType.PB_SUP_EDIT_OVERVIEW_DRAFT,
        payload: data
    });
};

const deleteOverviewDraft = (plu:string) => (dispatch:Dispatch) => {
    console.log("ini action delete draft");
     dispatch({
        type: PbSuplActionType.PB_SUP_DELETE_OVERVIEW_DRAFT,
        payload: plu
    });
};

const qtyOrderValidation = (data:PbSuppQtyOrderRequestEntity) => async (dispatch:Dispatch) => {
     try{
        const response = await PbSuplRepository.QtyOrder(data);
        if(response.returnType === "S") {
            dispatch({
                type: SettingActionType.SET_LOADING,
                isLoading: false
            });
            dispatch({
                type: AlertActionType.SET_ALERTS,
                isOpen: true,
                message: response.returnData.message
            });
             dispatch({
            type: PbSuplActionType.PB_SUP_QTY_ORDER_VALIDATION,
            messageAlert: response.returnData.message,
            status: response.returnData.status
        });
        }else{
            dispatch({
                type: SettingActionType.SET_LOADING,
                isLoading: false
            });
            dispatch({
                type: AlertActionType.SET_ALERTS,
                isOpen: true,
                message: response.returnData.message
            });
             dispatch({
                type: PbSuplActionType.PB_SUP_QTY_ORDER_VALIDATION,
                messageAlert: response.returnData.message,
                status: response.returnData.status
            });
        }
     }catch(err) {
        dispatch({
                type: PbSuplActionType.PB_SUP_QTY_ORDER_VALIDATION,
                messageAlert: (err as Error).message,
                status: 2
            });
     }
};

const save = (data:PbSuppRequestSaveDataEntity) => async (dispatch:Dispatch) => {
    try{
        const response = await PbSuplRepository.saveStore(data);
        if(response.returnType === "S") {
             dispatch({
                type: SettingActionType.SET_LOADING,
                isLoading: false
            });
             dispatch({
                type: AlertActionType.SET_ALERTS,
                isOpen: true,
                message: response.returnData.message
            });
            dispatch(
                {
                    type: PbSuplActionType.PB_SUP_SAVE,
                    noPb: response.returnData.nopb,
                    messageAlert: response.returnData.message,
                    status: response.returnData.status
                }
            );
        }else{
             dispatch({
                type: SettingActionType.SET_LOADING,
                isLoading: false
            });
             dispatch({
                type: AlertActionType.SET_ALERTS,
                isOpen: true,
                message: response.returnData.message
            });
            dispatch(
                {
                    type: PbSuplActionType.PB_SUP_SAVE,
                    noPb: response.returnData.nopb,
                    messageAlert: response.returnData.message,
                    status: response.returnData.status
                }
            );
        }
    }catch(err) {
         dispatch({
                type: SettingActionType.SET_LOADING,
                isLoading: false
            });
        dispatch({
                type: PbSuplActionType.PB_SUP_SAVE,
                noPb: "",
                messageAlert: (err as Error).message,
                status: 2
            });
    }
};

const verify = (data:PbSuppRequestSaveDataEntity) => async (dispatch:Dispatch) => {
    try{
        const response = await PbSuplRepository.verifyStore(data);
        if(response.returnType === "S") {
            dispatch({
                type: AlertActionType.SET_ALERTS,
                isOpen: true,
                message: response.returnData.message
            });
            dispatch(
                {
                    type: PbSuplActionType.PB_SUP_SAVE,
                    noPb: response.returnData.nopb,
                    messageAlert: response.returnData.message,
                    status: response.returnData.status
                }
            );
        }else{
            dispatch(
                {
                    type: PbSuplActionType.PB_SUP_SAVE,
                    noPb: response.returnData.nopb,
                    messageAlert: response.returnData.message,
                    status: response.returnData.status
                }
            );
        }
    }catch(err) {
        dispatch({
                type: PbSuplActionType.PB_SUP_SAVE,
                noPb: "",
                messageAlert: (err as Error).message,
                status: 2
            });
    }
};

const clearData = () => async (dispatch:Dispatch) => {
    dispatch({
        type: PbSuplActionType.PB_SUP_CLEAR_ALL,

    });
};

export const PbSuplAction = {
    getAllDataPbSuplAction,
    overview,
    checkRosso,
    pluValidation,
    addOverviewDraft,
    editOverviewDraft,
    deleteOverviewDraft,
    qtyOrderValidation,
    clearData,
    save,
    verify
};
