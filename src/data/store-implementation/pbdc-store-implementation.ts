/* eslint-disable react-hooks/rules-of-hooks */
import { PbdcStore } from "@/src/domain/store/pbdc-store";
import { AppRootState } from "./app-store-implementation";
import { useDispatch, useSelector } from "react-redux";
import { PbdcStoreState } from "../reducer/pbdc-reducer";
import { useCallback } from "react";
import { PbdcAction } from "../action/pbdc-action";
import {
    PbdcEntity,
    RequestPbdcDetailEntity,
} from "@/src/domain/entity/pbdc-entity";

const pbdcSelector = (state: AppRootState) => state.pbdc;

const pbdcStoreImplementation = (): PbdcStore => {
    const { pbdcs, pbdc, pbdcDraft } = useSelector<
        AppRootState,
        PbdcStoreState
    >(pbdcSelector);
    const dispatch = useDispatch();

    // override from store
    const getPerStore = useCallback(
        (store_code: string) => PbdcAction.getPerStoreAction(store_code)(dispatch),
        [dispatch]
    );

    const save = useCallback(
        (request: PbdcEntity) => PbdcAction.saveAction(request)(dispatch),
        [dispatch]
    );

    const saveDraftDetail = useCallback(
        (request: RequestPbdcDetailEntity) => PbdcAction.saveDraftDetailAction(request)(dispatch),
        [dispatch]
    );

    const deleteDraftDetail = useCallback(
        (id: number) => PbdcAction.deleteDraftDetailAction(id)(dispatch),
        [dispatch]
    );

    return {
        pbdcs,
        pbdc,
        pbdcDraft,
        getPerStore,
        save,
        saveDraftDetail,
        deleteDraftDetail,
    };
};

export { pbdcStoreImplementation, pbdcSelector };
