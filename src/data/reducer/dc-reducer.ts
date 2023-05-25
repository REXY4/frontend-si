import { DcStore } from "@/src/domain/store/dc-store";
import { DcActionType } from "../action-type/dc-action-type";
import { AnyAction } from "redux";

type DcStoreState = Omit<DcStore, "getAllDcStore"|"setSelectDc">;

const INITIAL_STATE:DcStoreState = {
    dc: "",
    selectDc: ""
};

const dcReducer = (state:DcStoreState = INITIAL_STATE, action : AnyAction) => {
    switch (action.type) {
        case DcActionType.GET_ALL:
            return {
                ...state,
                dc: action?.dc
            };
        case DcActionType.SELECT_DC:
            return {
                ...state,
                selectDc: action.payload
            };
     default:
        return state;
    }
};

export { dcReducer };
export type { DcStoreState };
