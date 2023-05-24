import { PbdcStore } from "@/src/domain/store/pbdc-store";

const getPbdcOverview = async (
            store: PbdcStore,
            data: any,
            store_code:string,
            dc :string,
            noPb : string
) => {
    await store.getPbdcOverview(
            data,
            store_code,
            dc,
            noPb,
     );
};

export { getPbdcOverview };
