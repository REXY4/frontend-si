import { PbdcEntity } from "@/src/domain/entity/pbdc-entity";
import { PbdcStore } from "@/src/domain/store/pbdc-store";

const getPbdcOverview = async (
            store: PbdcStore,
            data: PbdcEntity,
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
