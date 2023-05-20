import { DcRepository } from '@/src/domain/repository/dc-repository';
import { Dispatch } from 'redux';
import { SettingActionType } from '../action-type/settting-action-type';
import { DcActionType } from '../action-type/dc-action-type';

const getAllDcStoreAction = (store_code:string) => async (dispatch:Dispatch) => {
      dispatch({ type: SettingActionType.SET_LOADING, isLoading: true });
    try{
        const response = await DcRepository.getAllDcStore(store_code);
        if(response.returnType === "S") {
            dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
            dispatch({ type: DcActionType.GET_ALL, dc: response.returnData });
        }else{
            dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
        }
    }catch(err) {
      dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
    }
};

export const DcAction = {
    getAllDcStoreAction
};
