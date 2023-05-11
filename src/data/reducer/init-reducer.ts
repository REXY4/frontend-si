/* eslint-disable default-param-last */
import type { AnyAction } from "redux";
import { InitStore } from "@/src/domain/store/init-store";
import { InitActionType } from "../action-type/init-action-type";

type InitStoreState = Omit<InitStore, "initUser">;

const INITIAL_STATE: any = {
    user: undefined,
    validation: undefined,
    status: undefined,
};

const initReducer = (
    state: InitStoreState = INITIAL_STATE,
    action: AnyAction
) => {
    switch (action.type) {
        case InitActionType.INIT_USER:
            return {
                ...state,
                user: action.payload?.data[0] ?? {},
                menus: action.payload?.data[0]?.groups[0]?.menus ?? [],
                status: action?.payload?.status,
                validation: action?.payload?.validation ?? [],
            };
        default:
            return state;
    }
};

export { initReducer };
export type { InitStoreState };
