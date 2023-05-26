import {
    PbdcDetailEntity,
    PbdcEntity,
    PluEntity,
    FormDetailItemPbdc,
    RequestPbdcDetailEntity,
    ResponsePbdcRossoEntity,
} from "../entity/pbdc-entity";
import { ResponseEntity } from "../entity/response-entity";
import { UserEntity } from "../entity/user-entity";
import { BaseStore } from "./base-store";

interface PbdcStore {
    pbdc: any;
    pbdcs: any;
    pbdcDraft: PbdcEntity;
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
    selectDc : string,
    // Action
    setSelectDc(dc : string):any
    getPerStore(store_code: string):Promise<void | ResponseEntity<[PbdcEntity]>>;
    getPbdcOverview(
        data: any,
        store_code:string,
        dc :string,
            noPb : string):Promise<void |ResponseEntity<[any]>>;
    deleteAllItemDraftPbdc():Promise<void|any>
    postPluValidation(
        store:string,
        barcode:string,
        dc:string):Promise<void | ResponseEntity<any>>;
    addDetailItemPbdc(data:FormDetailItemPbdc):Promise<FormDetailItemPbdc|any>;
    deleteDetailItemPbdc(plu:string):Promise<any>
    // editDetailItemPbdc(plu:string):Promise<any>
    editDetailItemPbdc(data:FormDetailItemPbdc):Promise<FormDetailItemPbdc|any>
    getDetailItemPbdc(data:FormDetailItemPbdc):Promise<FormDetailItemPbdc|any>
    postPbdcVerify(
        store_code:string,
        noPb:string,
        dc:string,
        detailItemPbdc : any
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

    deleteDraftDetail(id: number): Promise<null>;
}

export type { PbdcStore };
