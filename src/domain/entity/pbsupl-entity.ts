export interface PbSuppEntity {
      cab: string,
      nopb: string,
      tipe: string,
      tgl: string,
      nilai: number,
      status: string
}

export interface PbSuppOverviewEntity {
      fdnour: string,
      plu: string,
      desc: string,
      conv: string,
      // eq: string,
      qty: string,
      // nilai: string,
      fr: string
}

export interface PbSuppResponseMessageEntity {
    status : number
    message :string
}

export interface PbSuppPluValidationRequestEntity{
    store: string,
    plu: string
}

export interface PbSuppPluEntity {
    message: string,
    status: number,
    plu: string,
    desc: string,
    conv: string,
    fmisis: number
}

export interface PbSuppDetailSaveDataEntity {
    nour: number,
    plu: string,
    conv: number | any,
    qty: number | any,
      fr: number | any
}

export interface PbSuppRequestSaveDataEntity {
  store: string,
  nopb: string,
  detailItemPbSupplier : [PbSuppDetailSaveDataEntity] | any
}

export interface PbSuppQtyOrderRequestEntity {
  store: string,
  plu: string,
  konversi: number | any,
  qty: number,
  fr: number
}

export interface PbSuppResponseSaveDataEntity {
     nopb: string,
    message: string,
    status: number
}
