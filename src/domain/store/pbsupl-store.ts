import { ResponseEntity } from "../entity/response-entity";

interface PbSuplStore {
    pbsupl : any
    getAllDataPbSupl(store:string):Promise<void>
}

export type { PbSuplStore };
