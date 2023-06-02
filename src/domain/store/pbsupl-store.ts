import {
 PbSuppEntity, PbSuppPluEntity,
  PbSuppResponseMessageEntity,
  PbSuppPluValidationRequestEntity,
  PbSuppQtyOrderRequestEntity,
  PbSuppRequestSaveDataEntity,
   PbSuppResponseSaveDataEntity,
   PbSuppOverviewEntity
} from '../entity/pbsupl-entity';

import { ResponseEntity } from "../entity/response-entity";

interface PbSuplStore {
    pbsupl : [PbSuppEntity] | []
    overview : [PbSuppOverviewEntity] | []
    status : number,
    messageAlert : string,
    detailData : PbSuppEntity | undefined
    noPb : string,
    pluData : PbSuppPluEntity | undefined
    getAllDataPbSuplStore(store:string):Promise<ResponseEntity<[PbSuppEntity]> | void>
    overviewStore(data:PbSuppOverviewEntity, store:string, noPb:string):Promise<ResponseEntity<[PbSuppOverviewEntity]>| void>
    validationPluStore(data:PbSuppPluValidationRequestEntity):Promise<ResponseEntity<PbSuppPluEntity> | void>
    addOverviewDraft(data:PbSuppOverviewEntity):void
    editOverviewDraft(data:PbSuppOverviewEntity):void
    deleteOverviewDraft(plu:string):void
    clearAllData():void
    checkRossoStore(store:string):Promise<ResponseEntity<PbSuppResponseMessageEntity>| void>
    QtyOrderStore(data:PbSuppQtyOrderRequestEntity):Promise<ResponseEntity<PbSuppResponseMessageEntity> | void>
    saveStore(data:PbSuppRequestSaveDataEntity):Promise<ResponseEntity<PbSuppResponseSaveDataEntity> | void>
    verifyStore(data:PbSuppRequestSaveDataEntity):Promise<ResponseEntity<PbSuppResponseSaveDataEntity> | void>
}

export type { PbSuplStore };
