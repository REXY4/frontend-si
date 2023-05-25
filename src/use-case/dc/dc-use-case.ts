import { DcStore } from "@/src/domain/store/dc-store";

const dcStoreUseCase = async (store: DcStore, store_code : string) => {
    await store.getAllDcStore(store_code);
};

const setSelectDc = async (store:DcStore, dc:string) => {
    await store.setSelectDc(dc);
};

export { dcStoreUseCase, setSelectDc };
