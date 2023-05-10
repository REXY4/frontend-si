import type { AnyAction } from "redux";
import { PbdcStore } from "@/src/domain/store/pbdc-store";
import { PbdcActionType } from "../action-type/pbdc-action-type";

type PbdcStoreState = Omit<PbdcStore, "getPerStore">;

const INITIAL_STATE: PbdcStoreState = {
    pbdc: undefined,
    pbdcs: undefined,
    pbdcDraft: {
        id: Math.floor(Math.random() * 100000 + 1),
        nopb: "XXXXXXXX",
        cab: "111",
        dc: "DCA",
        tipe: "1 - REGULAR",
        tgl: new Date().toLocaleDateString(),
        nilai: 0,
        status: "OK",
        details: [],
    },
};

const pbdcReducer = (
    state: PbdcStoreState = INITIAL_STATE,
    action: AnyAction
) => {
    switch (action.type) {
        case PbdcActionType.GET_PER_STORE:
            return {
                ...state,
                pbdcs: action.payload.returnData ?? [],
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
            var filteredArray = detailsDelete.filter(e => {
                console.log("compare", e, action);
                return e.id?.toString() !== action?.payload?.toString();
            });

            console.log("kkk", action.payload);
            console.log("before", detailsDelete);
            console.log("after", filteredArray);

            draftDelete = {
                ...draftDelete,
                details: filteredArray,
            };
            return {
                ...state,
                pbdcDraft: draftDelete,
            };
        default:
            return state;
    }
};

export { pbdcReducer };
export type { PbdcStoreState };
