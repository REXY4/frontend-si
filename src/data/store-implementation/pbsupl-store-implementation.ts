/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */

import { AppRootState } from "./app-store-implementation";
import { useDispatch, useSelector } from "react-redux";
import { PbdcStoreState } from "../reducer/pbdc-reducer";
import { useCallback } from "react";
import { PbSuplStore } from "@/src/domain/store/pbsupl-store";
import { pbSuplStoreState } from "../reducer/pbsupl-reducer";
import { PbSuplAction } from "../action/pbdsupl-action";
import {
 PbSuppOverviewEntity, PbSuppPluValidationRequestEntity, PbSuppQtyOrderRequestEntity, PbSuppRequestSaveDataEntity
} from "@/src/domain/entity/pbsupl-entity";

const pbSuplSelector = (state: AppRootState) => state.pbsupl;

const PbSuplImplementation = (): PbSuplStore => {
    const {
    pbsupl,
    overview,
    status,
    messageAlert,
    detailData,
    noPb,
    pluData
} = useSelector<
    AppRootState,
    pbSuplStoreState
    >(pbSuplSelector);
    const dispatch = useDispatch();

    const getAllDataPbSuplStore = useCallback(
    (store:string) => PbSuplAction.getAllDataPbSuplAction(store)(dispatch),
    [dispatch]
    );

    const overviewStore = useCallback(
    (data:PbSuppOverviewEntity, store:string, noPb:string) => PbSuplAction.overview(data, store, noPb)(dispatch),
    [dispatch]
    );

    const validationPluStore = useCallback(
    (data:PbSuppPluValidationRequestEntity) => PbSuplAction.pluValidation(data)(dispatch),
    [dispatch]
    );

    const addOverviewDraft = useCallback(
    (data:PbSuppOverviewEntity) => PbSuplAction.addOverviewDraft(data)(dispatch),
    [dispatch]
    );

     const editOverviewDraft = useCallback(
    (data:PbSuppOverviewEntity) => PbSuplAction.editOverviewDraft(data)(dispatch),
    [dispatch]
    );

     const checkRossoStore = useCallback(
    (store:string) => PbSuplAction.checkRosso(store)(dispatch),
    [dispatch]
    );

    const QtyOrderStore = useCallback(
    (data:PbSuppQtyOrderRequestEntity) => PbSuplAction.qtyOrderValidation(data)(dispatch),
    [dispatch]
    );

    const saveStore = useCallback(
    (data:PbSuppRequestSaveDataEntity) => PbSuplAction.save(data)(dispatch),
    [dispatch]
    );

    const verifyStore = useCallback(
    (data:PbSuppRequestSaveDataEntity) => PbSuplAction.verify(data)(dispatch),
    [dispatch]
    );

    const deleteOverviewDraft = useCallback(
    (plu:string) => PbSuplAction.deleteOverviewDraft(plu)(dispatch),
    [dispatch]
    );

    const clearAllData = useCallback(() => PbSuplAction.clearData()(dispatch), [dispatch]);
    return {
        pbsupl,
         overview,
    status,
    messageAlert,
    detailData,
    noPb,
    pluData,
        // action
        getAllDataPbSuplStore,
        overviewStore,
        validationPluStore,
        addOverviewDraft,
        editOverviewDraft,
        checkRossoStore,
        QtyOrderStore,
        deleteOverviewDraft,
        saveStore,
        clearAllData,
        verifyStore
    };
};

export { PbSuplImplementation, pbSuplSelector };
