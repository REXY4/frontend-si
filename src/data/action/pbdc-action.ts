import { PbdcRepository } from '@/src/domain/repository/pbdc-repository';
import {
  PbdcEntity,
  RequestPbdcDetailEntity,
} from '@/src/domain/entity/pbdc-entity';
import { PbdcActionType } from '../action-type/pbdc-action-type';
import { SettingActionType } from '../action-type/settting-action-type';
import { Dispatch } from 'redux';
import { AlertActionType } from '../action-type/alert-action-type';

const getPerStoreAction = (store_code: string) => async (dispatch: any) => {
  dispatch({ type: SettingActionType.SET_LOADING, isLoading: true });
  try{
  const response = await PbdcRepository.getPerStore(store_code);
  if(response.returnType === "E") {
      dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
      dispatch({ type: PbdcActionType.GET_PER_STORE, payload: response });
  }else{
    dispatch({ type: PbdcActionType.GET_PER_STORE, payload: response });
    dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
  }
  return response;
  }catch(err) {
      dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
  }
};

const postPbdcCheckRosso = (store_code:string) => async (dispatch: Dispatch) => {
  try{
      dispatch({ type: SettingActionType.SET_LOADING, isLoading: true });
      const response = await PbdcRepository.checkPbdcRosso(store_code);
      if(response.returnType == "S") {
         dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
      }else{
        dispatch({
          type: AlertActionType.SET_ALERTS,
          isOpen: true,
          message: response.returnMessage
        });
      }
  }catch(err) {
      dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
  }
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

const deleteDraftDetailAction = (id: number) => async (dispatch: any) => {
  dispatch({ type: SettingActionType.SET_LOADING, isLoading: true });
  dispatch({
    type: PbdcActionType.DELETE_DRAFT_DETAIL,
    payload: id,
  });
  dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
  return null;
};

export const PbdcAction = {
  postPbdcCheckRosso,
  getPerStoreAction,
  getDetailPbdcAction,
  saveAction,
  saveDraftDetailAction,
  deleteDraftDetailAction,
};
