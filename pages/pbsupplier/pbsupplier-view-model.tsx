import { useRouter } from "next/router";
import { settingStoreImplementation } from '@/src/data/store-implementation/setting-store-implementation';
import { dcStoreUseCase } from "@/src/use-case/dc/dc-use-case";
import dcImplementation from "@/src/data/store-implementation/dc-store-implementation";
import { useCallback, useEffect } from "react";
import { PbSuplGetAllUseCase } from "@/src/use-case/pbsupl/pbsupl-get-use-case";
import { authStoreImplementation } from '@/src/data/store-implementation/auth-store-implementation';
import { PbSuplImplementation } from "@/src/data/store-implementation/pbsupl-store-implementation";
import { UseCasePbSupp } from "@/src/use-case/pbsupl/pbsupl-use-case";
import { PbSuppOverviewEntity } from "@/src/domain/entity/pbsupl-entity";

const PbsupllierViewModel = () => {
    let router = useRouter();
    const settingStore = settingStoreImplementation();
    const dcStore = dcImplementation();
    const authStore = authStoreImplementation();
    const pbsuplStore = PbSuplImplementation();
    const { overviewUseCase } = UseCasePbSupp;

    const onloadAllData = useCallback(async () => {
        const { store }:any = authStore.auth;
      await PbSuplGetAllUseCase(pbsuplStore, store);
    }, [pbsuplStore?.pbsupl]);

    const onloadDc = useCallback(async () => {
         const { store }:any = authStore.auth;
        await dcStoreUseCase(dcStore, store);
    }, [dcStore?.dc]);

    const handleAddPbSupplier = async () => {
        await settingStore?.setLoading(true);
        router.push("/pbsupplier/add");
    };

    const handleShowDetail = async (data:PbSuppOverviewEntity, noPb:string) => {
        const { store }:any = authStore.auth;
        settingStore?.setLoading(true);
        await overviewUseCase(pbsuplStore, data, store, noPb);
        router.push("/pbsupplier/detail");
    };

    const handleEdit = async (data:PbSuppOverviewEntity, noPb:string) => {
        const { store }:any = authStore.auth;
        settingStore?.setLoading(true);
        await overviewUseCase(pbsuplStore, data, store, noPb);
        router.push("/pbsupplier/edit");
    };

    useEffect(() => {
        settingStore?.setLoading(false);
        onloadDc();
        onloadAllData();
    }, []);

    return {
        dataPbSupplier: pbsuplStore?.pbsupl,
        isLoading: settingStore?.isLoading,
        handleAddPbSupplier,
        handleShowDetail,
        handleEdit
    };
};

export default PbsupllierViewModel;
