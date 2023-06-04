export interface PbPoCanvasListResponseEntity {
    id : number
    cab : string
    noUo : string
    supplier : string
    nilai : number
    tgl : string
}

export interface PbPoCanvasOverviewResponseEntity {
    id : number,
    fdksup : string
    fmnama : string
    plu : string
    desc : string
    conv : string
    qty : string
    fr : string
}

export interface PbPoCanvasPluResponseEntity {
    id : number
    supplier : string
    status : string
    kdsup : string
    nmsup : string
    fmsotk : string
    lastsup : string
    stssup : string
}

export interface PbPoCanvasSaveRequest {
         noUo : string
         supplier : string
         tgl : string
         store : string
         DetailItemPoCanvas : [PbPoCanvasDetailItemRequest]
}

export interface PbPoCanvasDetailItemRequest {
        nour : number
        plu : string
        conv : number
        Qty : number
        Fr : number
}

export interface PbPoCanvasSaveResponse {
    message : string
    status : number
    noUo : string
}
