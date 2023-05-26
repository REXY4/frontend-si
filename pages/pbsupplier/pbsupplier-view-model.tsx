import { useRouter } from "next/router";
import { settingStoreImplementation } from '@/src/data/store-implementation/setting-store-implementation';
import { dcStoreUseCase } from "@/src/use-case/dc/dc-use-case";
import dcImplementation from "@/src/data/store-implementation/dc-store-implementation";
import { useCallback, useEffect } from "react";
import { PbSuplGetAllUseCase } from "@/src/use-case/pbsupl/pbsupl-get-use-case";
import { authStoreImplementation } from '@/src/data/store-implementation/auth-store-implementation';
import { PbSuplImplementation } from "@/src/data/store-implementation/pbsupl-store-implementation";

const PbsupllierViewModel = () => {
    let router = useRouter();
    const settingStore = settingStoreImplementation();
    const dcStore = dcImplementation();
    const authStore = authStoreImplementation();
    const pbsuplStore = PbSuplImplementation();
    const { store }:any = authStore.auth;

    const onloadAllData = useCallback(async () => {
      await PbSuplGetAllUseCase(pbsuplStore, store);
    }, [pbsuplStore?.pbsupl]);

    const onloadDc = useCallback(async () => {
        await dcStoreUseCase(dcStore, "0001");
    }, [dcStore?.dc]);

    const handleAddPbSupplier = async () => {
        await settingStore?.setLoading(true);
        router.push("/pbsupplier/add");
    };

    useEffect(() => {
        onloadDc();
        onloadAllData();
    }, []);

    return {
        dataPbSupplier: pbsuplStore?.pbsupl,
        isLoading: settingStore?.isLoading,
        handleAddPbSupplier
    };
};

export default PbsupllierViewModel;
