import { pbdcStoreImplementation } from "@/src/data/store-implementation/pbdc-store-implementation";
import { settingStoreImplementation } from "@/src/data/store-implementation/setting-store-implementation";
import { getPbdcPerStoreUseCase } from "@/src/use-case/pbdc/get-per-store-use-case";
import { useCallback, useState, useEffect } from "react";
import { PbdcDetailEntity, PbdcEntity } from "@/src/domain/entity/pbdc-entity";
import { saveDraftDetailUseCase } from "@/src/use-case/pbdc/save-draft-detail-use-case";
import { deleteDraftDetailUseCase } from "@/src/use-case/pbdc/delete-draft-detail-use-case";
import { saveUseCase } from "@/src/use-case/pbdc/save-use-case";
import { authStoreImplementation } from '@/src/data/store-implementation/auth-store-implementation';

const PbdcViewModel = () => {
    const pbdcStore = pbdcStoreImplementation();
    const authStore = authStoreImplementation();
    const settingStore = settingStoreImplementation();
    const [pbdcsFiltered, setPbdcsFiltered] = useState<PbdcEntity[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");

    const onLoad = useCallback(
        async () => {
            const { store }:any = authStore.auth;
            await getPbdcPerStoreUseCase(pbdcStore, store);
            setPbdcsFiltered(pbdcStore.pbdcs);
        },
        [pbdcStore]
    );

    const onFilter = (keyword: string) => {
        setIsLoading(true);
        let filtered = pbdcStore.pbdcs
            && pbdcStore.pbdcs.filter((data: PbdcEntity) => data.nopb.includes(keyword));
        setPbdcsFiltered(filtered);
        setIsLoading(false);
    };

    const onSave = useCallback(
        async (
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
            await saveUseCase(
                pbdcStore,
                id,
                nopb,
                cab,
                tipe,
                dc,
                tgl,
                nilai,
                status,
                details
            );
            let store_code = "0119";
            await getPbdcPerStoreUseCase(pbdcStore, store_code);
        },
        [pbdcStore]
    );

    const onSaveDraftDetail = useCallback(
        async (plu: string, eq: number) => {
            await saveDraftDetailUseCase(
                pbdcStore,
                Math.floor(Math.random() * 10000 + 1),
                0,
                "TESTING SAJAH",
                plu,
                12,
                eq,
                eq
            );
        },
        [pbdcStore]
    );

    const onDeleteDraftDetail = useCallback(
        async (id: number) => {
            await deleteDraftDetailUseCase(pbdcStore, id);
        },
        [pbdcStore]
    );

    const hideAlert = useCallback(async () => {
        setIsOpenAlert(false);
        alert(settingStore.isOpenAlert);
    }, [settingStore]);

    useEffect(() => {
        setIsLoading(settingStore?.isLoading);
    }, [settingStore?.isLoading]);

    useEffect(() => {
        setIsOpenAlert(settingStore?.isOpenAlert);
        console.log("is open alert", settingStore?.isOpenAlert);
    }, [settingStore?.isOpenAlert]);

    useEffect(() => {
        setAlertMessage(settingStore?.alertMessage);
    }, [settingStore?.alertMessage]);

    useEffect(() => {
        console.log("perubahan open alert", settingStore);
    }, [settingStore]);

    const dataPbdc = [
        {
              nopb: "PB1239211239",
              tipe: "T-REGULER",
              dc: "34012",
              nilai: "12939129"
        },
        {
              nopb: "PB123934459",
              tipe: "T-REGULER",
              dc: "34012",
              nilai: "12939129"
        },
        {
              nopb: "PB13343925669",
              tipe: "T-REGULER",
              dc: "34012",
              nilai: "12939129"
        },
        {
              nopb: "PB123921939",
              tipe: "T-REGULER",
              dc: "34012",
              nilai: "12939129"
        },
                {
              nopb: "PB123921939",
              tipe: "T-REGULER",
              dc: "34123",
              nilai: "12939129"
        },
        {
              nopb: "PB123921939",
              tipe: "T-REGULER",
              dc: "34012",
              nilai: "12939129"
        },
                {
              nopb: "PB123921939",
              tipe: "T-REGULER",
              dc: "34012",
              nilai: "12939129"
        },
        {
              nopb: "PB123921939",
              tipe: "T-REGULER",
              dc: "34012",
              nilai: "12939129"
        }, {
              nopb: "PB123921939",
              tipe: "T-REGULER",
              dc: "34012",
              nilai: "12939129"
        }
    ];

    return {
        pbdcs: dataPbdc,
        pbdcDraft: pbdcStore?.pbdcDraft,
        onLoad,
        onFilter,
        onSaveDraftDetail,
        onDeleteDraftDetail,
        isLoading: isLoading,
        isOpenAlert: isOpenAlert,
        alertMessage: alertMessage,
        onSave,
        hideAlert,
    };
};

export default PbdcViewModel;
