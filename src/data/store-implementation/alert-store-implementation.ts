/* eslint-disable react-hooks/rules-of-hooks */
import { AlertStore } from "@/src/domain/store/alert-store";
import { AppRootState } from "./app-store-implementation";
import { useDispatch, useSelector } from "react-redux";
import { AlertStoreState } from "../reducer/alert-reducer";
import { useCallback } from "react";
import { alertAction } from "../action/alert-action";

const alertSelector = (state: AppRootState) => state.alert;

const alertStoreImplementation = (): AlertStore => {
    const { isOpen, message } = useSelector<
    AppRootState,
    AlertStoreState
    >(alertSelector);
    const dispatch = useDispatch();

    const setAlert = useCallback(
        (isOpen:boolean, message:string) => alertAction.setOpenAlert(isOpen, message)(dispatch),
        [dispatch]
    );

    return {
        isOpen,
        message,
        setAlert,
    };
};

export { alertStoreImplementation };
