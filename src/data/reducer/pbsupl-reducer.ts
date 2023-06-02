/* eslint-disable no-fallthrough */
/* eslint-disable default-param-last */
import type { AnyAction } from "redux";

import { PbSuplActionType } from "../action-type/pbsupl-action-type";
import { PbSuplStore } from "@/src/domain/store/pbsupl-store";

type pbSuplStoreState = Omit<PbSuplStore,
"getAllDataPbSuplStore"|
"overviewStore"|
"validationPluStore"|
"addOverviewDraft" |
"editOverviewDraft" |
"deleteOverviewDraft" |
"checkRossoStore"|
"QtyOrderStore"|
"saveStore"|
"verifyStore"|
"clearAllData"
>;

const INITIAL_STATE: pbSuplStoreState = {
    pbsupl: [],
    overview: [],
    status: 0,
    messageAlert: '',
    noPb: '',
    pluData: undefined,
    detailData: undefined
};

const pbSuplReducer = (
    state: pbSuplStoreState = INITIAL_STATE,
    action: AnyAction
) => {
    switch (action.type) {
        case PbSuplActionType.PB_SUP_GET_ALL:
            return{
                ...state,
                pbsupl: action.payload,
                detailData: undefined,
                overview: []
            };
        case PbSuplActionType.PB_SUP_GET_OVERVIEW:
            return {
                ...state,
                detailData: action.detailData,
                overview: action.overview
            };
        case PbSuplActionType.PB_SUP_CHECK_ROSSO:
            return {
                ...state,
                messageAlert: action.messageAlert,
                status: action.status
            };
        case PbSuplActionType.PB_SUP_PLU_VALIDATION:
            return {
                ...state,
                messageAlert: action.messageAlert,
                status: action.status,
                pluData: action.pluData
            };
        case PbSuplActionType.PB_SUP_ADD_OVERVIEW_DRAFT:
            return {
                ...state,
                overview: [...state.overview, action.payload]
            };
        case PbSuplActionType.PB_SUP_DELETE_OVERVIEW_DRAFT:
            return {
                ...state,
                overview: state.overview.filter(
                    (fil:any) => fil.plu !== action.payload
                    )
            };
        case PbSuplActionType.PB_SUP_CLEAR_ALL:
            return {
                ...state,
                overview: [],
                  messageAlert: '',
                  noPb: '',
                 pluData: undefined,
                detailData: undefined
            };
        case PbSuplActionType.PB_SUP_EDIT_OVERVIEW_DRAFT:
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
        case PbSuplActionType.PB_SUP_QTY_ORDER_VALIDATION:
            return {
                ...state,
                messageAlert: action.messageAlert,
                status: action.status
            };
        case PbSuplActionType.PB_SUP_SAVE:
            return {
                ...state,
                 noPb: action.noPb,
                 messageAlert: action.messageAlert,
                 status: action.status
            };
        case PbSuplActionType.PB_SUP_VERIFY:
            return {
                ...state,
                 messageAlert: action.messageAlert,
                 status: action.status
            };
        default:
            return state;
    }
};

export { pbSuplReducer };
export type { pbSuplStoreState };
