import { pbdcStoreImplementation } from "@/src/data/store-implementation/pbdc-store-implementation";
import { settingStoreImplementation } from "@/src/data/store-implementation/setting-store-implementation";
import { getPbdcPerStoreUseCase } from "@/src/use-case/pbdc/get-per-store-use-case";
import { useCallback, useState, useEffect } from "react";
import { PbdcDetailEntity, PbdcEntity } from "@/src/domain/entity/pbdc-entity";
import { saveDraftDetailUseCase } from "@/src/use-case/pbdc/save-draft-detail-use-case";
import { deleteDraftDetailUseCase } from "@/src/use-case/pbdc/delete-draft-detail-use-case";
import { saveUseCase } from "@/src/use-case/pbdc/save-use-case";
import { dcStoreUseCase } from "@/src/use-case/dc/dc-use-case";
import { authStoreImplementation } from '@/src/data/store-implementation/auth-store-implementation';
import dcImplementation from "@/src/data/store-implementation/dc-store-implementation";
import { DcEntity } from "@/src/domain/entity/dc-entity";
import { postPbdcCheckRosso } from "@/src/use-case/pbdc/check-rosso-use-case";
import { alertStoreImplementation } from "@/src/data/store-implementation/alert-store-implementation";

const PbdcViewModel = () => {
    const pbdcStore = pbdcStoreImplementation();
    const authStore = authStoreImplementation();
    const dcStore = dcImplementation();
    const alertStore = alertStoreImplementation();
    const settingStore = settingStoreImplementation();
    const [pbdcsFiltered, setPbdcsFiltered] = useState<PbdcEntity[]>([]);
    const [dcFiltered, setDcFiltered] = useState<DcEntity[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");

    const onLoadPbdc = useCallback(async () => {
            const { store }:any = authStore.auth;
            await getPbdcPerStoreUseCase(pbdcStore, store);
            setPbdcsFiltered(pbdcStore.pbdcs);
       }, [pbdcStore?.pbdcs]);

    const onLoadAllDc = useCallback(async () => {
        const { store }:any = authStore.auth;
        await dcStoreUseCase(dcStore, store);
        setDcFiltered(dcStore?.dc);
    }, [dcStore?.dc]);

    const checkPbdcRosso = async () => {
         const { store }:any = authStore.auth;
         await postPbdcCheckRosso(pbdcStore, store);
    };

       useEffect(() => {
        onLoadPbdc();
        onLoadAllDc();
       }, []);

    return {
        alert: {
            isOpen: alertStore.isOpen,
            message: alertStore.message
        },
        checkPbdcRosso,
        pbdcs: pbdcsFiltered,
        dataDc: dcStore?.dc,
        pbdcDraft: pbdcStore?.pbdcDraft,
        onLoad: onLoadPbdc,
        isLoading: isLoading,
        isOpenAlert: isOpenAlert,
        alertMessage: alertMessage,
    };
};

export default PbdcViewModel;
