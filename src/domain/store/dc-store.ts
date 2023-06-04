import { DcEntity } from "../entity/dc-entity";

interface DcStore {
    dc : DcEntity,
    selectDc : string,
    setSelectDc(dc:string):Promise<void>;
    getAllDcStore(store_code: string): void;
}

export type { DcStore };
