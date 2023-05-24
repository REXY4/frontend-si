import { PbdcStore } from "@/src/domain/store/pbdc-store";

const postPbdcVerifyUseCase = async (
store: PbdcStore,
store_code: string,
noPb : string,
  dc : string
) => {
    await store.postPbdcVerify(store_code, noPb, dc);
};

export { postPbdcVerifyUseCase };
