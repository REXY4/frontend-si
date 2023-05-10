import { PbdcRepository } from '@/src/domain/repository/pbdc-repository';
import {
  PbdcEntity,
  RequestPbdcDetailEntity,
} from '@/src/domain/entity/pbdc-entity';
import { PbdcActionType } from '../action-type/pbdc-action-type';
import { SettingActionType } from '../action-type/settting-action-type';

const getPerStoreAction = (store_code: string) => async (dispatch: any) => {
  dispatch({ type: SettingActionType.SET_LOADING, isLoading: true });
  const response = await PbdcRepository.getPerStore(store_code);
  dispatch({ type: PbdcActionType.GET_PER_STORE, payload: response });
  dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
  return response;
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
  getPerStoreAction,
  saveAction,
  saveDraftDetailAction,
  deleteDraftDetailAction,
};
