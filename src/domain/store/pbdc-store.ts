import {
    PbdcDetailEntity,
    PbdcEntity,
    FormDetailItemPbdc,
    RequestPbdcDetailEntity,
    ResponsePbdcRossoEntity,
} from "../entity/pbdc-entity";
import { ResponseEntity } from "../entity/response-entity";

interface PbdcStore {
    pbdc: PbdcEntity | undefined;
    pbdcs: [PbdcEntity] | undefined;
    detailPbdc : any;
    pluValidation : any;
    statusPluValidation : boolean;
    checkRosso : ResponsePbdcRossoEntity | undefined;
    overviewPbdc : any;
    isLoadingBtnPluValidation : boolean;
    pbdcStatusVerify : boolean | undefined;
    pbdcStatusSave : Boolean | undefined;
    isLoadingBtnPbdcVerify: Boolean;
    isLoadingBtnPbdcSave : Boolean;
    fieldEditItem : FormDetailItemPbdc | any;
    detailItemPbdc : [FormDetailItemPbdc] | any;
    pbdcSaveData : any;
    selectDc : string,
    // Action
    setPbdcSaveStatus(condition:boolean):Promise<void>;
    setSelectDc(dc : string):any
    getPerStore(store_code: string):Promise<void | ResponseEntity<[PbdcEntity]>>;
    getAllDetailItemPbdc(data:[FormDetailItemPbdc]):Promise<void>;
    getPbdcOverview(
        data: PbdcEntity,
        store_code:string,
        dc :string,
        noPb : string):Promise<void |ResponseEntity<[any]>>;
    deleteAllItemDraftPbdc():Promise<void|any>
    postPluValidation(
        store:string,
        barcode:string,
        dc:string):Promise<void | ResponseEntity<any>>;
    addDetailItemPbdc(data:FormDetailItemPbdc):Promise<FormDetailItemPbdc|void>;
    deleteDetailItemPbdc(plu:string):Promise<any>
    editDetailItemPbdc(data:FormDetailItemPbdc):Promise<FormDetailItemPbdc|void>
    getDetailItemPbdc(data:FormDetailItemPbdc):Promise<FormDetailItemPbdc|void>
    postPbdcVerify(
        store_code:string,
        noPb:string,
        dc:string,
        detailItemPbdc : FormDetailItemPbdc
        ):Promise<void | ResponseEntity<void|any>>;
    postPbdcSaveData(
        store_code:string,
        noPb:string,
        dc:string,
        detailItemPbdc : [FormDetailItemPbdc]
        ):Promise<any>;
    save(request: PbdcEntity): Promise<void | ResponseEntity<PbdcEntity>>;
    postPbdcCheckRosso(store_code:string):Promise<void | ResponseEntity<ResponsePbdcRossoEntity>>;
    saveDraftDetail(
        request: RequestPbdcDetailEntity
    ): Promise<void | PbdcDetailEntity>;

    deleteDraftDetail(id: number): Promise<void>;
}

export type { PbdcStore };
