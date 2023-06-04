import { PbPoCanvasStore } from "@/src/domain/store/pb-pocanvas-store";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./app-store-implementation";
import { PbPoCanvasStoreState } from "../reducer/pb-pocanvas-reducer";
import { useCallback } from 'react';
import { PbPoCanvasAction } from "../action/pb-pocanvas";
import { PbPoCanvasListResponseEntity, PbPoCanvasSaveRequest } from "@/src/domain/entity/pb-pocanvas-entity";

const PbPoCanvasSelector = (state : AppRootState) => state.poCanvas;

const PbPoCanvasImplementation = ():PbPoCanvasStore => {
    const {
        poCanvasData,
        overview,
        noUo,
        dataSupplier,
        pluData,
    } = useSelector<
        AppRootState,
        PbPoCanvasStoreState
    >(PbPoCanvasSelector);
    const dispatch = useDispatch();

    const getList = useCallback((
        store:string
     ) => PbPoCanvasAction.getList(store)(dispatch), [dispatch]);
    const getOverview = useCallback((store:string, NoUo:string) => PbPoCanvasAction.getOverview(store, NoUo)(dispatch), [dispatch]);
    const pluValidation = useCallback((store:string, plu:string) => PbPoCanvasAction.pluValidation(store, plu)(dispatch), [dispatch]);
    const saveData = useCallback((body:PbPoCanvasSaveRequest) => PbPoCanvasAction.saveData(body)(dispatch), [dispatch]);
    const addDrafOverviewData = useCallback((data:PbPoCanvasListResponseEntity) => PbPoCanvasAction.addDataToDraft(data)(dispatch), [dispatch]);
    const editDraftOverviewData = useCallback((data:PbPoCanvasListResponseEntity) => PbPoCanvasAction.editDataFromDraft(data)(dispatch), [dispatch]);
    const deleteDraftOverviewData = useCallback((noUo:string) => PbPoCanvasAction.delDataFromDraft(noUo)(dispatch), [dispatch]);
    const clearAllData = useCallback(() => PbPoCanvasAction.clearAllDataInDraft()(dispatch), [dispatch]);

    return {
        poCanvasData,
        overview,
        noUo,
        dataSupplier,
        pluData,
        // action
        getList,
        getOverview,
        pluValidation,
        saveData,
        addDrafOverviewData,
        editDraftOverviewData,
        deleteDraftOverviewData,
        clearAllData
    };
};

export default PbPoCanvasImplementation;
