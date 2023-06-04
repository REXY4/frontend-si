import { PbPoCanvasStore } from "@/src/domain/store/pb-pocanvas-store";
import { AnyAction } from "redux";
import { PbPoCanvasActionType } from "../action-type/pb-pocanvas-type";

type PbPoCanvasStoreState = Omit<PbPoCanvasStore,
    "getList" |
    "getOverview" |
    "pluValidation" |
    "saveData" |
    "addDrafOverviewData" |
    "editDraftOverviewData" |
    "deleteDraftOverviewData" |
    "clearAllData"
>;

const INITIAL_STATE: PbPoCanvasStoreState = {
    poCanvasData: [],
    overview: [],
    noUo: undefined,
    dataSupplier: undefined,
    pluData: undefined
};

const PbPoCanvasReducer = (state:PbPoCanvasStoreState = INITIAL_STATE, action : AnyAction) => {
    switch (action.type) {
        case PbPoCanvasActionType.PB_POC_GET_LIST:
            return{
                ...state,
                poCanvasData: action.payload
            };
        case PbPoCanvasActionType.PB_POC_GET_OVERVIEW:
            return {
                ...state,
                overview: action.payload
            };
        case PbPoCanvasActionType.PB_POC_PLU_VALIDATION: {
            return {
                ...state,
                pluData: action.payload
            };
        }
        case PbPoCanvasActionType.PB_POC_ADD_DRAFT:
            return {
                ...state,
                overview: [...state.overview, action.payload]
            };
        case PbPoCanvasActionType.PB_POC_EDIT_DRAFT:
             const editedItemIndex = state.overview.findIndex(
                (item: any) => item.plu === action.payload.plu
            );
            const updatedItem = {
                ...state.overview[editedItemIndex],
                ...action.overview
            };
            const updatedItems = [...state.overview];
            updatedItems[editedItemIndex] = updatedItem;
            return {
                ...state,
                overview: updatedItems
            };
        case PbPoCanvasActionType.PB_POC_DEL_DRAFT:
            return{
                ...state,
                overview: state.overview.filter(
                    (fil:any) => fil.plu !== action.payload
                    )
            };
        case PbPoCanvasActionType.PB_POC_SAVE_DATA:
            return{
                ...state,
                noUo: action.noUo,
                dataSupplier: action.dataSupplier,
            };
        case PbPoCanvasActionType.PB_POC_CLEAR_DATA:
            return{
                ...state,
                overview: [],
                noUo: undefined,
                dataSupplier: undefined,
            };
     default:
        return state;
    }
};

export { PbPoCanvasReducer };
export type { PbPoCanvasStoreState };
