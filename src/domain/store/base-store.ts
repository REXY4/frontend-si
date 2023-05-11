import { ResponseEntity } from "../entity/response-entity";

export interface BaseStore {
    auth : any | undefined,
    validation: any | undefined;
    status: any | undefined
}
