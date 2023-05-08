import { RequestPbdcDetailEntity } from "@/src/domain/entity/pbdc-entity";
import { PbdcStore } from "@/src/domain/store/pbdc-store";

const saveDraftDetailUseCase = async (
  store: PbdcStore,
  id: number | undefined,
  pbdc_id: number,
  description: string,
  plu: string,
  convertion: number | undefined,
  eq: number | undefined,
  qty_order: number | undefined
) => {
  console.log("di use case save draft", id);
  await store.saveDraftDetail(
    createParams(id, pbdc_id, description, plu, convertion, eq, qty_order)
  );
};

const createParams = (
  id: number | undefined,
  pbdc_id: number,
  description: string,
  plu: string,
  convertion: number | undefined,
  eq: number | undefined,
  qty_order: number | undefined
): RequestPbdcDetailEntity => {
  let result: RequestPbdcDetailEntity = {
    id,
    pbdc_id,
    description,
    plu,
    convertion,
    eq,
    qty_order,
  };
  return result;
};

export { saveDraftDetailUseCase };
