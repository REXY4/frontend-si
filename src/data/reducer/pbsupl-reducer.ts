/* eslint-disable no-fallthrough */
/* eslint-disable default-param-last */
import type { AnyAction } from "redux";

import { PbSuplActionType } from "../action-type/pbsupl-action-type";
import { PbSuplStore } from "@/src/domain/store/pbsupl-store";

type pbSuplStoreState = Omit<PbSuplStore, "getAllDataPbSupl">;

const INITIAL_STATE: any = {
    pbsupl: []
};

const pbSuplReducer = (
    state: pbSuplStoreState = INITIAL_STATE,
    action: AnyAction
) => {
    switch (action.type) {
        case PbSuplActionType.GET_ALL:
            return{
                ...state,
                pbsupl: action.payload
            };
        default:
            return state;
    }
};

export { pbSuplReducer };
export type { pbSuplStoreState };
