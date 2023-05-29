/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import { PbdcStore } from "@/src/domain/store/pbdc-store";
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

const pbdcSelector = (state: AppRootState) => state.pbdc;

const pbdcStoreImplementation = (): PbdcStore => {
    const {
 pbdcs, pbdc, pbdcDraft,
  checkRosso, detailPbdc,
   overviewPbdc, pluValidation,
   statusPluValidation,
    isLoadingBtnPluValidation,
    pbdcStatusVerify,
    pbdcStatusSave,
    isLoadingBtnPbdcVerify,
    isLoadingBtnPbdcSave,
    detailItemPbdc,
    fieldEditItem,
    selectDc,
    pbdcSaveData,
} = useSelector<
        AppRootState,
        PbdcStoreState
    >(pbdcSelector);
    const dispatch = useDispatch();

    // override from store
    const getPerStore = useCallback(
        (store_code: string) => PbdcAction.getPerStoreAction(store_code)(dispatch),
        [dispatch]
    );

    const setSelectDc = useCallback((
        dc:string
) => PbdcAction.setSelectDc(dc)(dispatch), [dispatch]);

     const getPbdcOverview = useCallback(
        (
            data: any,
            store_code:string,
            dc :string,
            noPb : string
            ) => PbdcAction.getPbdcOverview(
                 data,
                 store_code,
                 dc,
                 noPb
            )(dispatch),
        [dispatch]
    );

    const postPbdcCheckRosso = useCallback(
        (store_code:string) => PbdcAction.postPbdcCheckRosso(store_code)(dispatch),
        [dispatch]
    );

     const postPbdcVerify = useCallback(
        (
store_code:string,
        noPb:string,
        dc:string
) => PbdcAction.postPbdcVerify(
    store_code,
    noPb,
    dc,
    detailItemPbdc,
)(dispatch),
        [dispatch]
    );

     const postPbdcSaveData = useCallback(
(
        store_code:string,
        noPb:string,
        dc:string,
        detailItemPbdc : [FormDetailItemPbdc]
) => PbdcAction.postPbdcSaveData(
    store_code,
    noPb,
    dc,
    detailItemPbdc
)(dispatch),
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

    const addDetailItemPbdc = useCallback(
           (data: FormDetailItemPbdc) => PbdcAction.addDetailItemPbdc(data)(dispatch),
            [dispatch]
    );

     const editDetailItemPbdc = useCallback(
           (data: FormDetailItemPbdc) => PbdcAction.editDetailItemPbdc(data)(dispatch),
            [dispatch]
    );

    const getDetailItemPbdc = useCallback(
           (data: FormDetailItemPbdc) => PbdcAction.getDetailItemPbdc(data)(dispatch),
            [dispatch]
    );

    const getAllDetailItemPbdc = useCallback(
        (data
        : [FormDetailItemPbdc]) => PbdcAction.getAllDetailDataForEdit(data)(dispatch),
         [dispatch]
);

//

    const deleteDetailItemPbdc = useCallback(
        (plu: string) => PbdcAction.deleteDetailItemPbdc(plu)(dispatch),
        [dispatch]
    );

    const deleteDraftDetail = useCallback(
        (id: number) => PbdcAction.deleteDraftDetailAction(id)(dispatch),
        [dispatch]
    );

     const postPluValidation = useCallback(
        (
        store:string,
        barcode:string,
        dc:string
) => PbdcAction.postPluValidation(store, barcode, dc)(dispatch),
        [dispatch]
    );
    const deleteAllItemDraftPbdc = useCallback(() => PbdcAction.deleteAllItemDraftPbdc()(dispatch), [dispatch]);

    const setPbdcSaveStatus = useCallback((condition:boolean) => PbdcAction.setPbdcSaveStatusAction(condition)(dispatch), [dispatch]);

    return {
        pbdcs,
        pbdc,
        pbdcDraft,
        checkRosso,
        detailPbdc,
        overviewPbdc,
        pluValidation,
        isLoadingBtnPluValidation,
        pbdcStatusVerify,
        statusPluValidation,
        pbdcStatusSave,
        isLoadingBtnPbdcVerify,
        isLoadingBtnPbdcSave,
        detailItemPbdc,
        fieldEditItem,
        selectDc,
        pbdcSaveData,
        // action
        getPerStore,
        getAllDetailItemPbdc,
        setPbdcSaveStatus,
        deleteAllItemDraftPbdc,
        setSelectDc,
        postPbdcSaveData,
        editDetailItemPbdc,
        postPbdcVerify,
        getPbdcOverview,
        addDetailItemPbdc,
        getDetailItemPbdc,
        postPbdcCheckRosso,
        postPluValidation,
        save,
        saveDraftDetail,
        deleteDraftDetail,
        deleteDetailItemPbdc
    };
};

export { pbdcStoreImplementation, pbdcSelector };
