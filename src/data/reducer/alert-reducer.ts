import { AlertActionType } from "../action-type/alert-action-type";
import { AlertStore } from "@/src/domain/store/alert-store";
import { AnyAction } from "redux";

type AlertStoreState = Omit<
    AlertStore,
    "setAlert"
>;

const INITIAL_STATE:AlertStoreState = {
    isOpen: false,
    message: "",
};

const alertReducer = (state:AlertStoreState = INITIAL_STATE, action : AnyAction) => {
    switch (action.type) {
        case AlertActionType.ALERT:
            return {
                ...state,
                isOpen: action.isOpen,
                message: action.message
            };
     default:
        return state;
    }
};

export { alertReducer };
export type { AlertStoreState };
