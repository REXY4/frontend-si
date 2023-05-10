import type { AnyAction } from "redux";
import { SettingStore } from "@/src/domain/store/setting-store";
import { SettingActionType } from "../action-type/settting-action-type";

type SettingStoreState = Omit<
    SettingStore,
    "setApplicationName" | "setLoading" | "setAlertMessage" | "setOpenAlert"
>;

const INITIAL_STATE: SettingStoreState = {
    isLoading: false,
    applicationName: "",
    alertMessage: "",
    isOpenAlert: false,
};

const settingReducer = (
    state: SettingStoreState = INITIAL_STATE,
    action: AnyAction
) => {
    switch (action.type) {
        case SettingActionType.SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        case SettingActionType.SET_ALERT_MESSAGE:
            return {
                ...state,
                alertMessage: action.alertMessage,
            };
        case SettingActionType.SET_APPLICATION_NAME:
            return {
                ...state,
                applicationName: action.applicatonName,
            };
        case SettingActionType.SET_OPEN_ALERT:
            return {
                ...state,
                isOpenAlert: action.isOpenAlert,
            };
        default:
            return state;
    }
};

export { settingReducer };
export type { SettingStoreState };
