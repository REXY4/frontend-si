/* eslint-disable no-case-declarations */
/* eslint-disable default-param-last */
import type { AnyAction } from "redux";
import { PbdcStore } from "@/src/domain/store/pbdc-store";
import { PbdcActionType } from "../action-type/pbdc-action-type";

type PbdcStoreState = Omit<
 PbdcStore,
 "getPerStore"|
 "save"|
 "postPbdcCheckRosso"|
 "postPluValidation" |
 "postPbdcVerify" |
 "postPbdcSaveData" |
 "saveDraftDetail"|
 "deleteDraftDetail" |
 "getPbdcOverview" |
 "addDetailItemPbdc"|
 "deleteDetailItemPbdc" |
 "editDetailItemPbdc" |
 "getDetailItemPbdc" |
 "setSelectDc"
 >;

const INITIAL_STATE: PbdcStoreState = {
    pbdc: undefined,
    pbdcs: undefined,
    detailPbdc: undefined,
    overviewPbdc: undefined,
    checkRosso: undefined,
    pluValidation: undefined,
    isLoadingBtnPluValidation: false,
    statusPluValidation: false,
    pbdcStatusVerify: undefined,
    isLoadingBtnPbdcVerify: false,
    isLoadingBtnPbdcSave: false,
    pbdcStatusSave: undefined,
    fieldEditItem: undefined,
    detailItemPbdc: [],
    selectDc: "",
    pbdcDraft: {
        id: Math.floor(Math.random() * 100000 + 1),
        nopb: "",
        cab: "",
        dc: "",
        tipe: "",
        tgl: "",
        nilai: 3,
        status: "",
        details: [],
    },
};

const pbdcReducer = (
    state: PbdcStoreState = INITIAL_STATE,
    action: AnyAction
) => {
    switch (action.type) {
        case PbdcActionType.GET_PER_STORE:
            if(state.pbdcs[0] === undefined) {
                return {
                ...state,
                pbdcs: action.payload.returnData ?? [],
            };
            }
                return {
                ...state,
                };
        case PbdcActionType.GET_DETAIL:
            return {
                ...state,
                detailPbdc: action.detailPbdc,
                overviewPbdc: action.overviewPbdc
            };
         case PbdcActionType.SELECT_DC:
                return{
                    ...state,
                    selectDc: action.selectDc
                };
        case PbdcActionType.PLU_VALIDATION:
            return{
                ...state,
                pluValidation: action.pluValidation,
                statusPluValidation: action.statusPluValidation,
                isLoadingBtnPluValidation: action.isLoadingBtnPluValidation,
                };
        case PbdcActionType.SET_DETAIL_ITEM:
                   return{
                ...state,
                detailItemPbdc: [...state.detailItemPbdc, action.detailItemPbdc]
                };

          case PbdcActionType.SET_FIELD_ITEM:
                   return{
                ...state,
                 fieldEditItem: action.fieldEditItem
            };
          case PbdcActionType.SET_EDIT_ITEM:
            const editedItemIndex = state.detailItemPbdc.findIndex(
                (item: any) => item.plu === action.detailItemPbdc.plu
            );
            const updatedItem = {
                ...state.detailItemPbdc[editedItemIndex],
                ...action.detailItemPbdc
            };
            const updatedItems = [...state.detailItemPbdc];
            updatedItems[editedItemIndex] = updatedItem;

            return {
                ...state,
                detailItemPbdc: updatedItems
            };
        case PbdcActionType.SET_DELETE_ITEM:
            return{
                ...state,
                detailItemPbdc: state.detailItemPbdc.filter(
                    (fil:any) => fil.plu !== action.detailItemPbdc
                    )
            };
        case PbdcActionType.PBDC_VERIFY:
            return {
                ...state,
                isLoadingBtnPbdcVerify: action.isLoadingBtnPbdcVerify,
                pbdcStatusVerify: action.pbdcStatusVerify
            };
        case PbdcActionType.PBDC_SAVE_DATA:
            const update = [...state.pbdcs, action.pbdcs];
            return {
                ...state,
                isLoadingBtnPbdcSave: action.isLoadingBtnPbdcSave,
                pbdcs: [...state.pbdcs, action.pbdcs]
            };
        case PbdcActionType.SAVE:
            return {
                ...state,
                pbdc: action?.payload?.returnData,
            };
        case PbdcActionType.SAVE_DRAFT_DETAIL:
            let draft = state?.pbdcDraft;
            if (draft === undefined) {
                draft = {
                    id: Math.floor(Math.random() * 10 + 1),
                    cab: "",
                    dc: "",
                    nilai: 0,
                    nopb: "XXXXXXXX",
                    status: "",
                    tgl: new Date().toDateString(),
                    tipe: "1",
                    details: [],
                };
            }
            let details = draft?.details;
            details.push(action.payload);
            draft = {
                ...draft,
                details,
            };
            return {
                ...state,
                pbdcDraft: draft,
            };
        case PbdcActionType.DELETE_DRAFT_DETAIL:
            let draftDelete = state?.pbdcDraft;

            let detailsDelete = draftDelete?.details;
            // eslint-disable-next-line no-var
            let filteredArray = detailsDelete.filter((e) => {
                return e.id?.toString() !== action?.payload?.toString();
            });
            draftDelete = {
                ...draftDelete,
                details: filteredArray,
            };
            return {
                ...state,
                pbdcDraft: draftDelete,
            };
         case PbdcActionType.CHECK_ROSSO:
            return{
                ...state,
                checkRosso: action.checkRosso
            };
        default:
            return state;
    }
};

export { pbdcReducer };
export type { PbdcStoreState };
