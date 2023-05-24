import { getPbdcPerStoreUseCase } from "@/src/use-case/pbdc/get-per-store-use-case";
import { pbdcStoreImplementation } from "@/src/data/store-implementation/pbdc-store-implementation";
import { authStoreImplementation } from '@/src/data/store-implementation/auth-store-implementation';
import { settingStoreImplementation } from "@/src/data/store-implementation/setting-store-implementation";
import { useEffect } from "react";

const HomeViewModel = () => {
    const pbdcStore = pbdcStoreImplementation();
    const authStore = authStoreImplementation();
    const settingStore = settingStoreImplementation();
    const { store, name, store_name }:any = authStore.auth;

    const onLoadData = async (name:string) => {
         if(name === "/pbdc") {
            await getPbdcPerStoreUseCase(pbdcStore, store);
            await settingStore.setLoading(true);
         }
    };

    useEffect(() => {
        return () => settingStore.setLoading(false);
    }, []);

    return {
        onLoadData,
        store_code: store,
        nameUser: name,
        storeName: store_name,
        isLoading: settingStore?.isLoading
    };
};

export default HomeViewModel;
