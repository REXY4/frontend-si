import { PbdcStore } from "@/src/domain/store/pbdc-store";

const deleteDraftDetailUseCase = async (store: PbdcStore, id: number) => {
    await store.deleteDraftDetail(id);
};

export { deleteDraftDetailUseCase };
