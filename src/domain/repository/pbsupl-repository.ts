import { PbSuplService } from "@/src/data/service/pbsupl-service";
import { mapResponse } from "@/src/helpers/map-response";
import { ResponseEntity } from "../entity/response-entity";
import {
 PbSuppEntity, PbSuppOverviewEntity, PbSuppPluEntity, PbSuppPluValidationRequestEntity, PbSuppQtyOrderRequestEntity, PbSuppRequestSaveDataEntity, PbSuppResponseMessageEntity, PbSuppResponseSaveDataEntity
} from "../entity/pbsupl-entity";

const getAllPbSuplRepository = async (
    store: string
): Promise<ResponseEntity<[PbSuppEntity]>> => mapResponse(
    await PbSuplService.getAllDataPbSupllierService(store)
);

const RepositoryPbSuppOverview = async (store:string, noPb:string):Promise<ResponseEntity<[PbSuppOverviewEntity]>> => mapResponse(
    await PbSuplService.ServicePbSuppOverview(store, noPb)
);

const pluValidation = async (data:PbSuppPluValidationRequestEntity):Promise<ResponseEntity<PbSuppPluEntity>> => mapResponse(
    await PbSuplService.ServicePbSuppPluValidation(data)
);

const checkRosso = async (store:string):Promise<ResponseEntity<PbSuppResponseMessageEntity>> => mapResponse(
    await PbSuplService.ServicePbSuppCheckRosso(store)
);

const QtyOrder = async (data:PbSuppQtyOrderRequestEntity):Promise<ResponseEntity<PbSuppResponseMessageEntity>> => mapResponse(
    await PbSuplService.ServicePbSuppQtyOrderValidation(data)
);
const saveStore = async (data:PbSuppRequestSaveDataEntity):Promise<ResponseEntity<PbSuppResponseSaveDataEntity>> => mapResponse(
    await PbSuplService.ServicePbSuppSave(data)
);
const verifyStore = async (data:PbSuppRequestSaveDataEntity):Promise<ResponseEntity<PbSuppResponseSaveDataEntity>> => mapResponse(
    await PbSuplService.ServicePbSuppVerify(data)
);

export const PbSuplRepository = {
    getAllPbSuplRepository,
    RepositoryPbSuppOverview,
    pluValidation,
    checkRosso,
    QtyOrder,
    saveStore,
    verifyStore
};
