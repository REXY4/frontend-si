import { mapResponse } from "@/src/helpers/map-response";
import { ResponseEntity } from '../entity/response-entity';
import {
 PbPoCanvasListResponseEntity, PbPoCanvasOverviewResponseEntity, PbPoCanvasPluResponseEntity, PbPoCanvasSaveRequest, PbPoCanvasSaveResponse
} from "../entity/pb-pocanvas-entity";
import { PbPoCanvasService } from "@/src/data/service/pb-pocanvas-service";

const getList = async (
    store:string
):Promise<ResponseEntity<[PbPoCanvasListResponseEntity]>> => mapResponse(
    await PbPoCanvasService.getList(store)
);

const getOverview = async (store:string, NoUo:string):Promise<ResponseEntity<[PbPoCanvasOverviewResponseEntity]>> => mapResponse(
    await PbPoCanvasService.getOverview(store, NoUo)
);

const pluValidation = async (
    store:string,
    plu:string
):Promise<ResponseEntity<PbPoCanvasPluResponseEntity>> => mapResponse(
    await PbPoCanvasService.pluValidation(store, plu)
);

const saveData = async (
    body:PbPoCanvasSaveRequest
): Promise<ResponseEntity<PbPoCanvasSaveResponse>> => mapResponse(
    await PbPoCanvasService.saveData(body)
);

export const PbPoCanvasRepository = {
    getList,
    getOverview,
    pluValidation,
    saveData
};
