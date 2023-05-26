import { PbSuplService } from "@/src/data/service/pbsupl-service";
import { mapResponse } from "@/src/helpers/map-response";

const getAllPbSuplRepository = async (
    store: string
): Promise<any> => mapResponse(await PbSuplService.getAllDataPbSupllierService(store));

export const PbSuplRepository = {
    getAllPbSuplRepository
};
