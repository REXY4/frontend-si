import { PbdcStore } from "@/src/domain/store/pbdc-store";

const deleteDraftDetailUseCase = async (store: PbdcStore, id: number) => {
    await store.deleteDraftDetail(id);
};

const deleteAlllItemDraftUseCase = async (store:PbdcStore) => {
    await store.deleteAllItemDraftPbdc();
};

export { deleteDraftDetailUseCase, deleteAlllItemDraftUseCase };
