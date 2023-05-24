import { DcStore } from "@/src/domain/store/dc-store";

const dcStoreUseCase = async (store: DcStore, store_code : string) => {
    await store.getAllDcStore(store_code);
};

export { dcStoreUseCase };
