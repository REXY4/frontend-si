export interface PbdcEntity {
    id: number;
    cab: string;
    nopb: string;
    tipe: string;
    dc: string;
    tgl: string;
    nilai: number;
    status: string;
    details: PbdcDetailEntity[];
}

export interface PbdcDetailEntity {
    id?: number;
    pbdc_id: number;
    plu: string;
    description?: string;
    convertion?: number;
    eq?: number;
    qty_order?: number;
}

export interface RequestPbdcDetailEntity {
    id?: number;
    pbdc_id: number;
    plu: string;
    description?: string;
    convertion?: number;
    eq?: number;
    qty_order?: number;
}

export interface ResponsePbdcRossoEntity {
    statusRosso : boolean
    message : string
}

export interface PluEntity {
        mug: string,
        stsTag: any,
        plu: string,
        deskripsi: string,
        konv: string,
        fmkgrp: string,
        fmsing: string,
        fmisis: string,
        fmfdpt: string,
        fmfcrs: string,
        fmkdep: string,
        fmfbkp: string,
        fmtpdc: string,
        qtyPcs: string,
        sts_ord: string,
        qty: string,
        fr: string
}

export interface FormDetailItemPbdc {
      nour: string,
      plu: string,
      desc : string,
      eq: number | string,
      order: number | string
}

// export interface PbdcResponsePluValidation {

// }
