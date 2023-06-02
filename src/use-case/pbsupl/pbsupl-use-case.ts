import {
    PbSuppOverviewEntity,
    PbSuppPluValidationRequestEntity,
    PbSuppQtyOrderRequestEntity,
    PbSuppRequestSaveDataEntity
 } from "@/src/domain/entity/pbsupl-entity";
import { PbSuplStore } from "@/src/domain/store/pbsupl-store";

const checkRosso = async (
            pbStore: PbSuplStore,
            store : string
) => {
    await pbStore.checkRossoStore(store);
};

const overviewUseCase = async (
            pbStore: PbSuplStore,
            data: PbSuppOverviewEntity,
            store : string,
            noPb : string,
) => {
    await pbStore.overviewStore(data, store, noPb);
};

const validationPluUseCase = async (
            pbStore: PbSuplStore,
           data:PbSuppPluValidationRequestEntity
) => {
    await pbStore.validationPluStore(data);
};

const addOverviewDraftUseCase = async (pbStore:PbSuplStore, data:PbSuppOverviewEntity) => {
    await pbStore.addOverviewDraft(data);
};
const editOverviewDraftUseCase = async (pbStore:PbSuplStore, data:PbSuppOverviewEntity) => {
    await pbStore.editOverviewDraft(data);
};

const deleteOverviewDraftUseCase = async (pbStore:PbSuplStore, plu:string) => {
    await pbStore.deleteOverviewDraft(plu);
};

const qtyOrderUseCase = async (pbStore:PbSuplStore, data:PbSuppQtyOrderRequestEntity) => {
    await pbStore.QtyOrderStore(data);
};

const saveUseCase = async (pbStore: PbSuplStore, data:PbSuppRequestSaveDataEntity) => {
    await pbStore.saveStore(data);
};
const verifyUseCase = async (pbStore: PbSuplStore, data:PbSuppRequestSaveDataEntity) => {
    await pbStore.verifyStore(data);
};

export const UseCasePbSupp = {
    checkRosso,
    overviewUseCase,
    validationPluUseCase,
    addOverviewDraftUseCase,
    editOverviewDraftUseCase,
    deleteOverviewDraftUseCase,
    qtyOrderUseCase,
    saveUseCase,
    verifyUseCase
};
