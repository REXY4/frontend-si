import { FormDetailItemPbdc } from "@/src/domain/entity/pbdc-entity";
import { PbdcStore } from "@/src/domain/store/pbdc-store";

const postPbdcSaveData = async (
store: PbdcStore,
store_code: string,
noPb : string,
dc : string,
detailItemPbdc : FormDetailItemPbdc
) => {
    await store.postPbdcSaveData(store_code, noPb, dc, detailItemPbdc);
};

export { postPbdcSaveData };
