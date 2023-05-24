import { mapResponse } from "@/src/helpers/map-response";
import { ResponseEntity } from "../entity/response-entity";
import { DcService } from "@/src/data/service/dc-service";
import { DcEntity } from "../entity/dc-entity";

const getAllDcStore = async (
    store_code: string
): Promise<ResponseEntity<[DcEntity]>> => mapResponse(await DcService.getAllDc(store_code));

export const DcRepository = {
    getAllDcStore
};
