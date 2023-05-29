/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */

import { AppRootState } from "./app-store-implementation";
import { useDispatch, useSelector } from "react-redux";
import { PbdcStoreState } from "../reducer/pbdc-reducer";
import { useCallback } from "react";
import { PbdcAction } from "../action/pbdc-action";
import {
    FormDetailItemPbdc,
    PbdcEntity,
    RequestPbdcDetailEntity,
} from "@/src/domain/entity/pbdc-entity";
import { PbSuplStore } from "@/src/domain/store/pbsupl-store";
import { pbSuplStoreState } from "../reducer/pbsupl-reducer";
import { PbSuplAction } from "../action/pbdsupl-action";

const pbSuplSelector = (state: AppRootState) => state.pbsupl;

const PbSuplImplementation = (): PbSuplStore => {
    const {
    pbsupl
} = useSelector<
    AppRootState,
    pbSuplStoreState
    >(pbSuplSelector);
    const dispatch = useDispatch();

    const getAllDataPbSupl = useCallback(
    (store:string) => PbSuplAction.getAllDataPbSuplAction(store)(dispatch),
    [dispatch]
);

    return {
        pbsupl,
        getAllDataPbSupl
    };
};

export { PbSuplImplementation, pbSuplSelector };
