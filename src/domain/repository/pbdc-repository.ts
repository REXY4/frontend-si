/* eslint-disable max-len */
import { mapResponse } from "@/src/helpers/map-response";
import { ResponseEntity } from '../entity/response-entity';
import { FormDetailItemPbdc, PbdcEntity, ResponsePbdcRossoEntity } from "../entity/pbdc-entity";
import { PbdcService } from "@/src/data/service/pbdc-service";

const getPerStore = async (
    store_code: string
): Promise<ResponseEntity<[PbdcEntity]>> => mapResponse(await PbdcService.getPerStore(store_code));

const getPbdcOverview = async (
    store_code:string,
    dc :string,
    noPb : string
) : Promise<ResponseEntity<[any]>> => mapResponse(await PbdcService.getOverviewPbdc(store_code, dc, noPb));

const checkPbdcRosso = async (
    store_code :string
    ) :Promise<ResponseEntity<ResponsePbdcRossoEntity>> => mapResponse(await PbdcService.postCheckPbdcRosso(store_code));

const postPluValidation = async (
    store:string,
        barcode:string,
        dc:string
) : Promise<ResponseEntity<any>> => mapResponse(await PbdcService.postPluValidation(store, barcode, dc));

const postPbdcVerify = async (
 store_code:string,
        noPb:string,
    dc:string
) : Promise<ResponseEntity<Boolean>> => mapResponse(await PbdcService.postPbdcVerify(store_code, noPb, dc));

const postPbdcSaveData = async (
 store_code:string,
        noPb:string,
    dc:string,
      detailItemPbdc : [FormDetailItemPbdc]
) : Promise<ResponseEntity<any>> => mapResponse(await PbdcService.postPbdcSaveData(store_code, noPb, dc, detailItemPbdc));

const save = async (
    request: PbdcEntity
): Promise<ResponseEntity<PbdcEntity>> => mapResponse(await PbdcService.save(request));

export const PbdcRepository = {
    checkPbdcRosso,
    getPbdcOverview,
    postPluValidation,
    postPbdcVerify,
    postPbdcSaveData,
    getPerStore,
    save,
};
