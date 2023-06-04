import {
 PbPoCanvasListResponseEntity, PbPoCanvasOverviewResponseEntity, PbPoCanvasPluResponseEntity, PbPoCanvasSaveRequest, PbPoCanvasSaveResponse
} from "../entity/pb-pocanvas-entity";
import { ResponseEntity } from "../entity/response-entity";

interface PbPoCanvasStore {
    poCanvasData :[PbPoCanvasListResponseEntity] | []
    overview : [PbPoCanvasOverviewResponseEntity] | []
    noUo : string | undefined
    dataSupplier : string | undefined
    pluData : PbPoCanvasPluResponseEntity | undefined
    // action
    getList(store:string):Promise<ResponseEntity<[PbPoCanvasListResponseEntity]>| void>
    getOverview(store:string, NoUo:string):Promise<ResponseEntity<[PbPoCanvasOverviewResponseEntity]>| void>
    pluValidation(store:string, plu:string):Promise<ResponseEntity<PbPoCanvasPluResponseEntity>| void>
    saveData(body:PbPoCanvasSaveRequest):Promise<ResponseEntity<PbPoCanvasSaveResponse>| void>
    addDrafOverviewData(data:PbPoCanvasListResponseEntity):Promise<void>
    editDraftOverviewData(data:PbPoCanvasListResponseEntity):Promise<void>
    deleteDraftOverviewData(noUo:string):Promise<void>
    clearAllData():Promise<void>
}

export type { PbPoCanvasStore };
