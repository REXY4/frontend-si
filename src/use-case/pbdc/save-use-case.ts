import { PbdcEntity } from "@/src/domain/entity/pbdc-entity";
import { PbdcDetailEntity } from "@/src/domain/entity/pbdc-entity";
import { PbdcStore } from "@/src/domain/store/pbdc-store";

const saveUseCase = async (
    store: PbdcStore,
    id: number,
    nopb: string,
    cab: string,
    tipe: string,
    dc: string,
    tgl: string,
    nilai: number,
    status: string,
    details: PbdcDetailEntity[]
) => {
    await store.save(
        createParams(id, nopb, cab, tipe, dc, tgl, nilai, status, details)
    );
};

const createParams = (
    id: number,
    nopb: string,
    cab: string,
    tipe: string,
    dc: string,
    tgl: string,
    nilai: number,
    status: string,
    details: PbdcDetailEntity[]
): PbdcEntity => {
    let result: PbdcEntity = {
        id,
        nopb,
        cab,
        tipe,
        dc,
        tgl,
        nilai,
        status,
        details,
    };

    return result;
};

export { saveUseCase };
