import { appStoreImplementation } from "@/src/data/store-implementation/app-store-implementation";
import { DefaultValue } from "./constant/default-value";

const updateStateList = (stateDataList: any[], newDataList: any[]) => {
    const result = stateDataList?.map(
            (obj) => newDataList.find((o) => o.id == obj.id) || obj
        ) ?? [];
    return result;
};

const removeItemStateList = (stateDataList: any[], id: any) => {
    const result = stateDataList?.filter((x) => x.id != id);
    return result;
};

const addItemStateList = (stateDataList: [any], newData: any) => {
    const result = Object.assign([], stateDataList);
    result?.push(newData);
    result?.sort((a, b) => a - b);
    return result;
};

const setStateFromStateList = (stateDataList: [any], id: string) => {
    const idx = stateDataList?.findIndex((item) => item.id == id);
    const result = stateDataList?.[idx] ?? {};
    return result;
};

const clearState = (actionType: string) => {
    appStoreImplementation.dispatch({
        type: actionType,
        payload: DefaultValue.EmptyResponse,
    });
};

const setState = (actionType: string, payload: any) => {
    appStoreImplementation.dispatch({
        type: actionType,
        payload: payload,
    });
};

export const MapStateReducers = {
    updateStateList,
    removeItemStateList,
    addItemStateList,
    setStateFromStateList,
    clearState,
    setState,
};
