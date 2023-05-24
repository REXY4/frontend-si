import { PbdcStore } from "@/src/domain/store/pbdc-store";

const postPluValidationUseCase = async (
    stores: PbdcStore,
     store:string,
      barcode:string,
    dc:string
) => {
    await stores.postPluValidation(store, barcode, dc);
};

export { postPluValidationUseCase };
