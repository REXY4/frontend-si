import React, { useState, useEffect } from "react";
import { PbSuplImplementation } from '@/src/data/store-implementation/pbsupl-store-implementation';
import { UseCasePbSupp } from "@/src/use-case/pbsupl/pbsupl-use-case";
import { PbSuppRequestSaveDataEntity } from "@/src/domain/entity/pbsupl-entity";
import { authStoreImplementation } from '@/src/data/store-implementation/auth-store-implementation';
import { alertStoreImplementation } from "@/src/data/store-implementation/alert-store-implementation";
import { settingStoreImplementation } from "@/src/data/store-implementation/setting-store-implementation";
import { useRouter } from "next/router";

const PbSupEditViewModel = () => {
    let router = useRouter();
    const authStore = authStoreImplementation();
    const pbStore = PbSuplImplementation();
    const alertStore = alertStoreImplementation();
    const { verifyUseCase } = UseCasePbSupp;
    const settingStore = settingStoreImplementation();
    const [openVerify, setOpenVerify] = useState<boolean>(false);

    const handelVerify = async () => {
        const { store }:any = authStore.auth;
        const data:PbSuppRequestSaveDataEntity = {
              nopb: String(pbStore?.detailData?.nopb),
              store: String(store),
              detailItemPbSupplier: pbStore?.overview.map((item:any, index:number) => {
                return {
                    nour: item.fdnour,
                    plu: item.plu,
                    konversi: item.konversi === "" ? 0 : item.konversi,
                    qty: item.qty === "" ? 0 : item.qty,
                    fr: item.fr === "" ? 0 : item.fr
                };
              })
        };
        await verifyUseCase(pbStore, data);
        setOpenVerify(false);
    };
    const handleBack = () => {
        settingStore?.setLoading(true);
        router.push("/pbsupplier");
    };
    const handleCloseAlertSuccess = async () => {
        settingStore?.setLoading(true);
        alertStore?.setAlert(false, "");
        router.push("/pbsupplier");
    };

        useEffect(() => {
            alertStore?.setAlert(false, "");
            settingStore?.setLoading(false);
        }, []);
    return {
        dataPb: pbStore?.detailData,
        overview: pbStore?.overview,
        handelVerify,
        openVerify,
        handleBack,
        statusAlert: pbStore?.status,
        alerts: {
            isOpen: alertStore?.isOpen,
            message: alertStore?.message
        },
        isLoading: settingStore?.isLoading,
        handleCloseAlertSuccess,
        setOpenVerify,
    };
};

export default PbSupEditViewModel;
