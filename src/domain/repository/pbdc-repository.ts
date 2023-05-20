/* eslint-disable max-len */
import { mapResponse } from "@/src/helpers/map-response";
import { ResponseEntity } from "../entity/response-entity";
import { PbdcEntity, RequestPbdcRossoEntity } from "../entity/pbdc-entity";
import { PbdcService } from "@/src/data/service/pbdc-service";

const getPerStore = async (
    store_code: string
): Promise<ResponseEntity<[PbdcEntity]>> => mapResponse(await PbdcService.getPerStore(store_code));

const checkPbdcRosso = async (
    store_code :string
    ) :Promise<ResponseEntity<RequestPbdcRossoEntity>> => mapResponse(await PbdcService.postCheckPbdcRosso(store_code));

const save = async (
    request: PbdcEntity
): Promise<ResponseEntity<PbdcEntity>> => mapResponse(await PbdcService.save(request));

export const PbdcRepository = {
    checkPbdcRosso,
    getPerStore,
    save,
};
