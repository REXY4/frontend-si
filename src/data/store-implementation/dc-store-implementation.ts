/* eslint-disable react-hooks/rules-of-hooks */
import { DcStore } from "@/src/domain/store/dc-store";
import { AppRootState } from "./app-store-implementation";
import { DcStoreState } from "../reducer/dc-reducer";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DcAction } from "../action/dc-action";

const dcSelector = (state : AppRootState) => state.dc;

const dcImplementation = ():DcStore => {
    const { dc, selectDc, } = useSelector<
    AppRootState,
    DcStoreState
    >(dcSelector);

    const dispatch = useDispatch();

    const getAllDcStore = useCallback(
        (store_code:string) => DcAction.getAllDcStoreAction(store_code)(dispatch),
        [dispatch]
    );

    const setSelectDc = useCallback(
        (dc:string) => DcAction.selectDcAction(dc)(dispatch),
        [dispatch]
    );

    return {
        dc,
        selectDc,
        setSelectDc,
        getAllDcStore
    };
};

export default dcImplementation;
