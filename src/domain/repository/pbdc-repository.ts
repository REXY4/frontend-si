import { mapResponse } from "@/src/helpers/map-response";
import { ResponseEntity } from "../entity/response-entity";
import { PbdcEntity } from "../entity/pbdc-entity";
import { PbdcService } from "@/src/data/service/pbdc-service";

const getPerStore = async (
    store_code: string
): Promise<ResponseEntity<[PbdcEntity]>> => {
    return mapResponse(await PbdcService.getPerStore(store_code));
};

const save = async (
    request: PbdcEntity
): Promise<ResponseEntity<PbdcEntity>> => {
    return mapResponse(await PbdcService.save(request));
};

export const PbdcRepository = {
    getPerStore,
    save,
};
