import { PbdcRepository } from '@/src/domain/repository/pbdc-repository';
import {
  FormDetailItemPbdc,
  PbdcEntity,
  RequestPbdcDetailEntity,
} from '@/src/domain/entity/pbdc-entity';
import { PbdcActionType } from '../action-type/pbdc-action-type';
import { SettingActionType } from '../action-type/settting-action-type';
import { Dispatch } from 'redux';
import { AlertActionType } from '../action-type/alert-action-type';
import { DcActionType } from '../action-type/dc-action-type';

const getPerStoreAction = (store_code: string) => async (dispatch: Dispatch) => {
  const response = await PbdcRepository.getPerStore(store_code);
  if(response.returnType === "S") {
    dispatch({ type: PbdcActionType.GET_PER_STORE, payload: response });
    return response;
  }
    dispatch({ type: PbdcActionType.GET_PER_STORE, payload: response });
    return response;
};

const setSelectDc = (dc : string) => (dispatch:Dispatch) => {
  dispatch({
    type: PbdcActionType.SELECT_DC,
    selectDc: dc
  });
};

const getPbdcOverview = (
  data: PbdcEntity,
  store_code:string,
  dc :string,
  noPb : string
) => async (dispatch:Dispatch) => {
  dispatch({ type: SettingActionType.SET_LOADING, isLoading: true });
  try{
    const response = await PbdcRepository.getPbdcOverview(store_code, dc, noPb);
    if(response.returnType === "S") {
        dispatch({
          type: PbdcActionType.GET_DETAIL,
          detailPbdc: data,
          overviewPbdc: response.returnData
        });
     }else{
      dispatch({
          type: PbdcActionType.GET_DETAIL,
          detailPbdc: data,
          overviewPbdc: response.returnData
        });
        dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
     }
  }catch(err) {
  dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
  }
};

const postPbdcCheckRosso = (store_code:string) => async (dispatch: Dispatch) => {
  try{
      const response = await PbdcRepository.checkPbdcRosso(store_code);
      if(response.returnType == "S") {
         dispatch({ type: PbdcActionType.CHECK_ROSSO, checkRosso: response.returnData });
      }else{
          dispatch({ type: PbdcActionType.CHECK_ROSSO, checkRosso: response.returnData });
      }
  }catch(err) {
      dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
  }
};

const getDetailItemPbdc = (data:FormDetailItemPbdc) => async (dispatch:Dispatch) => {
   dispatch({
    type: PbdcActionType.SET_FIELD_ITEM,
     fieldEditItem: data
   });
};

const editDetailItemPbdc = (data:FormDetailItemPbdc) => async (dispatch:Dispatch) => {
   dispatch({
    type: PbdcActionType.SET_EDIT_ITEM,
    detailItemPbdc: data
   });
};

const deleteDetailItemPbdc = (plu:string) => async (dispatch:Dispatch) => {
   dispatch({
    type: PbdcActionType.SET_DELETE_ITEM,
    detailItemPbdc: plu
   });
};

const deleteAllItemDraftPbdc = () => async (dispatch:Dispatch) => {
    dispatch({
     type: PbdcActionType.SET_DELETE_ALL_ITEM,
   });
};

const postPluValidation = (
      store:string,
       barcode:string,
      dc:string
) => async (dispatch:Dispatch) => {
   dispatch({ type: PbdcActionType.PLU_VALIDATION, isLoadingBtnPluValidation: true });
  try{
    const response = await PbdcRepository.postPluValidation(store, barcode, dc);
    if(response.returnType === "S") {
      dispatch({ type: AlertActionType.SET_ALERTS, isOpen: true, message: `Validasi PLU ${response.returnData.plu} Berhasil!` });
      dispatch({
        type: PbdcActionType.PLU_VALIDATION,
        isLoadingBtnPluValidation: false,
        statusPluValidation: true,
        pluValidation: response.returnData
      });
    }else{
      dispatch({
        type: PbdcActionType.PLU_VALIDATION,
        isLoadingBtnPluValidation: false,
        statusPluValidation: false,
        pluValidation: response.returnData
      });
        dispatch({
          type: AlertActionType.SET_ALERTS,
          isOpen: true,
          message: "Plu Tidak Di temukan !..."
      });
    }
  }catch(err) {
        dispatch({ type: AlertActionType.SET_ALERTS, isOpen: true, message: "Plu tidak Di temukan !.." });
      dispatch({
        type: PbdcActionType.PLU_VALIDATION,
        statusPluValidation: false,
        isLoadingBtnPluValidation: false,
        pluValidation: undefined
      });
  }
};

const addDetailItemPbdc = (data:FormDetailItemPbdc) => async (dispatch:Dispatch) => {
  dispatch({
    type: PbdcActionType.SET_DETAIL_ITEM,
    detailItemPbdc: data
  });
};

const postPbdcVerify = (
store_code: string,
noPb : string,
dc : string,
detailItemPbdc : FormDetailItemPbdc
) => async (dispatch:Dispatch) => {
  try{
    dispatch({ type: PbdcActionType.PBDC_VERIFY, isLoadingBtnPbdcVerify: true, });
    const response = await PbdcRepository.postPbdcVerify(store_code, noPb, dc, detailItemPbdc);
    if(response.returnType === "S") {
    dispatch({
      type: PbdcActionType.PBDC_VERIFY,
       isLoadingBtnPbdcVerify: false,
      pbdcStatusVerify: response.returnData
    });
    }else{
        dispatch({
      type: PbdcActionType.PBDC_VERIFY,
       isLoadingBtnPbdcVerify: false,
      pbdcStatusVerify: response.returnData
    });
    }
  }catch(err) {
  dispatch({
      type: PbdcActionType.PBDC_VERIFY,
       isLoadingBtnPbdcVerify: false,
      pbdcStatusVerify: false
    });
  }
};

const postPbdcSaveData = (
  store_code : string,
  noPb : string,
  dc : string,
  detailItemPbdc : [FormDetailItemPbdc]
) => async (dispatch:Dispatch) => {
  try{
    const response = await PbdcRepository.postPbdcSaveData(store_code, noPb, dc, detailItemPbdc);
    if(response.returnType === "S") {
        dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
      dispatch({
        type: AlertActionType.SET_ALERTS,
        isOpen: true,
        message: response.returnMessage,
      });
      dispatch({
        type: PbdcActionType.PBDC_SAVE_DATA,
        payload: response.returnData
      });
      dispatch({
        type: PbdcActionType.SET_STATUS_SAVE_PBDC,
        payload: true
      });
    }else {
      dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
      dispatch({
         type: AlertActionType.SET_ALERTS,
         isOpen: true,
         message: response.returnMessage,
      });
       dispatch({
        type: PbdcActionType.PBDC_SAVE_DATA,
        payload: response.returnData
      });
       dispatch({
        type: PbdcActionType.SET_STATUS_SAVE_PBDC,
        payload: false
      });
    }
  }catch(err) {
    dispatch({
      type: PbdcActionType.PBDC_SAVE_DATA,
      isLoadingBtnPbdcSave: false,
    });
  }
};

const setPbdcSaveStatusAction = (condition:boolean) => async (dispatch:Dispatch) => {
    dispatch({
      type: PbdcActionType.SET_STATUS_SAVE_PBDC,
      payload: condition
    });
};

const getDetailPbdcAction = (data:any) => async (dispatch:any) => {
    dispatch({ type: PbdcActionType.GET_DETAIL, detailPbdc: data });
};

const saveAction = (request: PbdcEntity) => async (dispatch: any) => {
  dispatch({ type: SettingActionType.SET_LOADING, isLoading: true });
  const response = await PbdcRepository.save(request);
  dispatch({
    type: PbdcActionType.SAVE,
    payload: response,
  });
  dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
  dispatch({ type: SettingActionType.SET_OPEN_ALERT, isOpenAlert: true });
  dispatch({
    type: SettingActionType.SET_ALERT_MESSAGE,
    alertMessage: 'Data berhasil disimpan',
  });
  return response;
};

const saveDraftDetailAction = (request: RequestPbdcDetailEntity) => async (dispatch: any) => {
  const actionType = PbdcActionType.SAVE_DRAFT_DETAIL;

  dispatch({ type: SettingActionType.SET_LOADING, isLoading: true });
  dispatch({
    type: actionType,
    payload: request,
  });
  dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });

  const response = {
    ...request,
  };
  return response;
};

const deleteDraftDetailAction = (id:number) => async (dispatch: Dispatch) => {
  dispatch({
        type: PbdcActionType.PBDC_SAVE_DATA,
        payload: undefined
      });
  dispatch({
        type: PbdcActionType.SET_STATUS_SAVE_PBDC,
        payload: true
  });
  dispatch({
    type: DcActionType.SELECT_DC,
    payload: ""
  });
};

const getAllDetailDataForEdit = (data:any) => async (dispatch:Dispatch) => {
    dispatch({
      type: PbdcActionType.GET_DETAIL_ALL_EDIT_ITEM,
      payload: data
    });
};

export const PbdcAction = {
  getPerStoreAction,
  getPbdcOverview,
  postPbdcCheckRosso,
  deleteAllItemDraftPbdc,
  getDetailPbdcAction,
  setSelectDc,
  getAllDetailDataForEdit,
  postPluValidation,
  setPbdcSaveStatusAction,
  editDetailItemPbdc,
  addDetailItemPbdc,
  getDetailItemPbdc,
  postPbdcVerify,
  postPbdcSaveData,
  saveAction,
  saveDraftDetailAction,
  deleteDraftDetailAction,
  deleteDetailItemPbdc,
};
