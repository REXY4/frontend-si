import { DcStore } from "@/src/domain/store/dc-store";
import { DcActionType } from "../action-type/dc-action-type";
import { AnyAction } from "redux";

type DcStoreState = Omit<DcStore, "getAllDcStore">;

const INITIAL_STATE:DcStoreState = {
    dc: ""
};

const dcReducer = (state:DcStoreState = INITIAL_STATE, action : AnyAction) => {
    switch (action.type) {
        case DcActionType.GET_ALL:
            return {
                ...state,
                dc: action?.dc
            };
     default:
        return state;
    }
};

export { dcReducer };
export type { DcStoreState };
