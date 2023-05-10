import { PbdcStore } from "@/src/domain/store/pbdc-store";

const getPbdcPerStoreUseCase = async (store: PbdcStore, store_code: string) => {
    await store.getPerStore(store_code);
};

export { getPbdcPerStoreUseCase };
