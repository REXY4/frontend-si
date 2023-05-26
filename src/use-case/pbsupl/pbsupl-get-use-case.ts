import { PbSuplStore } from "@/src/domain/store/pbsupl-store";

const PbSuplGetAllUseCase = async (
            pbStore: PbSuplStore,
            store : string
) => {
    await pbStore.getAllDataPbSupl(store);
};

export { PbSuplGetAllUseCase };
