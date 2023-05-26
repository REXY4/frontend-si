import React, { useEffect, useState } from "react";
import dcImplementation from '@/src/data/store-implementation/dc-store-implementation';
import { pbdcStoreImplementation } from '@/src/data/store-implementation/pbdc-store-implementation';
import { DcStore } from '@/src/domain/store/dc-store';
import { validationJustNumber } from "@/src/helpers/validation";
import { FormDetailItemPbdc } from "@/src/domain/entity/pbdc-entity";
import { postPbdcVerifyUseCase } from '@/src/use-case/pbdc/post-pbdc-verify-use-case';
import { authStoreImplementation } from '@/src/data/store-implementation/auth-store-implementation';

const PbdcDetailViewModel = () => {
    const authStore = authStoreImplementation();
    const pbdcStore = pbdcStoreImplementation();
    const dcStore = dcImplementation();
    const [plu, setPlu] = useState<string>("");
    const [openModalVerify, setOpenModalVerify] = useState<boolean>(false);

     const handleDetected = (result:any) => {
        setPlu(result);
    };
// { id: 0, cab: "0001", nopb: "PB3E25019",
// tipe: "1", dc: "0970", tgl: "2023-05-25T11:51:00", nilai: 0, status: "Draft" }

    const onPostVerifyPbdc = async () => {
         const { store }:any = authStore.auth;
        const { nopb, dc }:any = pbdcStore.detailPbdc;
        const detail:any = pbdcStore?.overviewPbdc;
        console.log("click");
       await postPbdcVerifyUseCase(pbdcStore, store, nopb, dc, detail);
    };

    console.log("ini adalah daa dc", dcStore?.dc);

    return{
        dataPbdc: pbdcStore?.detailPbdc,
        overview: pbdcStore?.overviewPbdc,
        dataDc: dcStore?.dc && dcStore?.dc.filter(
            ({ fmkcab }:any) => fmkcab === pbdcStore?.detailPbdc.dc
        )[0],
        plu,
        setPlu,
        handleDetected,
        openModalVerify,
        setOpenModalVerify,
        onPostVerifyPbdc
    };
};

export default PbdcDetailViewModel;
