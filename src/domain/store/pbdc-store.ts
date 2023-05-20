import {
    PbdcDetailEntity,
    PbdcEntity,
    RequestPbdcDetailEntity,
} from "../entity/pbdc-entity";
import { ResponseEntity } from "../entity/response-entity";
import { UserEntity } from "../entity/user-entity";
import { BaseStore } from "./base-store";

interface PbdcStore {
    pbdc: any;
    pbdcs: any;
    pbdcDraft: PbdcEntity;

    // Action
    // getPerStore(store_code: string): Promise<ResponseEntity<[PbdcEntity]>>;
    getPerStore(store_code:string) : any
    save(request: PbdcEntity): Promise<ResponseEntity<PbdcEntity>>;
    postPbdcCheckRosso(store_code:string):any
    saveDraftDetail(
        request: RequestPbdcDetailEntity
    ): Promise<PbdcDetailEntity>;

    deleteDraftDetail(id: number): Promise<null>;
}

export type { PbdcStore };
