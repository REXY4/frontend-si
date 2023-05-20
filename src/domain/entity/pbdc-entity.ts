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

export interface RequestPbdcRossoEntity {
    message : string
    rosso : boolean
}
