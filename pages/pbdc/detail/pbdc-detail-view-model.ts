import React, { useEffect, useState } from "react";
import dcImplementation from '@/src/data/store-implementation/dc-store-implementation';
import { pbdcStoreImplementation } from '@/src/data/store-implementation/pbdc-store-implementation';
import { DcStore } from '@/src/domain/store/dc-store';
import { onlyValidationNumber } from "@/src/helpers/validation";
import { FormDetailItemPbdc } from "@/src/domain/entity/pbdc-entity";
import { postPbdcVerifyUseCase } from '@/src/use-case/pbdc/post-pbdc-verify-use-case';
import { authStoreImplementation } from '@/src/data/store-implementation/auth-store-implementation';
import { useRouter } from "next/router";
import { settingStoreImplementation } from "@/src/data/store-implementation/setting-store-implementation";
import { SettingStore } from '@/src/domain/store/setting-store';

const PbdcDetailViewModel = () => {
    const authStore = authStoreImplementation();
    const pbdcStore = pbdcStoreImplementation();
    const settingStore = settingStoreImplementation();
    const dcStore = dcImplementation();
    const router = useRouter();
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

       await postPbdcVerifyUseCase(pbdcStore, store, nopb, dc, detail);
    };

    const handleBack = () => {
        router.push("/pbdc");
    };

    return{
        dataPbdc: pbdcStore?.detailPbdc,
        overview: pbdcStore?.overviewPbdc,
        dataDc: undefined,
        plu,
        totalItem: String(pbdcStore?.overviewPbdc?.length),
        setPlu,
        handleBack,
        handleDetected,
        openModalVerify,
        setOpenModalVerify,
        onPostVerifyPbdc
    };
};

export default PbdcDetailViewModel;
