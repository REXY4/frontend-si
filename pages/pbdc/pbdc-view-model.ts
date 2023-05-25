import { pbdcStoreImplementation } from "@/src/data/store-implementation/pbdc-store-implementation";
import { settingStoreImplementation } from "@/src/data/store-implementation/setting-store-implementation";
import { getPbdcPerStoreUseCase } from "@/src/use-case/pbdc/get-per-store-use-case";
import { useCallback, useState, useEffect } from "react";
import {
  PbdcEntity
} from "@/src/domain/entity/pbdc-entity";
import { dcStoreUseCase } from "@/src/use-case/dc/dc-use-case";
import { authStoreImplementation } from '@/src/data/store-implementation/auth-store-implementation';
import dcImplementation from "@/src/data/store-implementation/dc-store-implementation";
import { postPbdcCheckRosso } from "@/src/use-case/pbdc/check-rosso-use-case";
import { alertStoreImplementation } from "@/src/data/store-implementation/alert-store-implementation";
import { getPbdcOverview } from "@/src/use-case/pbdc/get-overview-pbdc-use-case";
import { useRouter } from "next/router";

const PbdcViewModel = () => {
    const pbdcStore = pbdcStoreImplementation();
    const authStore = authStoreImplementation();
    const dcStore = dcImplementation();
    const alertStore = alertStoreImplementation();
    const settingStore = settingStoreImplementation();
    const [pbdcsFiltered, setPbdcsFiltered] = useState<PbdcEntity[]>([]);
    let router = useRouter();

    const onLoadPbdc = useCallback(async () => {
            const { store }:any = authStore.auth;
            await getPbdcPerStoreUseCase(pbdcStore, store);
            setPbdcsFiltered(pbdcStore.pbdcs);
     }, [pbdcStore?.pbdc]);

    const onLoadAllDc = useCallback(async () => {
        const { store }:any = authStore.auth;
        await dcStoreUseCase(dcStore, store);
    }, [dcStore?.dc]);

    const checkPbdcRosso = useCallback(async () => {
         const { store }:any = authStore.auth;
         await postPbdcCheckRosso(pbdcStore, store);
    }, [pbdcStore?.checkRosso]);

    const onLoadPbdcOverviews = useCallback(async (
            data: any,
            dc :string,
            noPb : string
     ) => {
          const { store }:any = authStore.auth;
        settingStore.setLoading(true);
         await getPbdcOverview(pbdcStore, data, store, dc, noPb);
         await router.push("/pbdc/detail");
    }, [pbdcStore?.overviewPbdc]);

    const handleAddNewPbdc = async () => {
        settingStore.setLoading(true);
         if(pbdcStore?.checkRosso?.statusRosso) {
             router.push("/pbdc/add");
         }else{
           settingStore?.setLoading(false);
           alertStore?.setAlert(true, String(pbdcStore?.checkRosso?.message));
         }
     };

    useEffect(() => {
        settingStore?.setLoading(false);
        onLoadAllDc();
        onLoadPbdc();
        checkPbdcRosso();
    }, []);

    return {
        alert: {
            isOpen: alertStore.isOpen,
            message: alertStore.message
        },
        handleAddNewPbdc,
        pbdcs: pbdcsFiltered,
        handleOverviewPbdc: onLoadPbdcOverviews,
        isLoading: settingStore?.isLoading,
        setAlert: alertStore?.setAlert
    };
};

export default PbdcViewModel;
