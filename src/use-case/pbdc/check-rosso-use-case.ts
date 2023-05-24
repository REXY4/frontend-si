import { PbdcStore } from "@/src/domain/store/pbdc-store";

const postPbdcCheckRosso = async (store: PbdcStore, store_code: string) => {
    await store.postPbdcCheckRosso(store_code);
};

export { postPbdcCheckRosso };
