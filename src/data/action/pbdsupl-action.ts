import { PbSuplRepository } from '@/src/domain/repository/pbsupl-repository';
import { Dispatch } from 'redux';
import { PbSuplActionType } from '../action-type/pbsupl-action-type';

const getAllDataPbSuplAction = (store:string) => async (dispatch:Dispatch) => {
    try{
        const response = await PbSuplRepository.getAllPbSuplRepository(store);
        dispatch({
            type: PbSuplActionType.GET_ALL,
            payload: response.returnData
        });
    }catch(err) {
        //
    }
};

export const PbSuplAction = {
    getAllDataPbSuplAction
};
