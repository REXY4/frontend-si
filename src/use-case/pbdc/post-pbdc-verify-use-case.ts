import { FormDetailItemPbdc } from "@/src/domain/entity/pbdc-entity";
import { PbdcStore } from "@/src/domain/store/pbdc-store";

const postPbdcVerifyUseCase = async (
store: PbdcStore,
store_code: string,
noPb : string,
dc : string,
detailItemPbdc : FormDetailItemPbdc
) => {
    await store.postPbdcVerify(store_code, noPb, dc, detailItemPbdc);
};

export { postPbdcVerifyUseCase };
