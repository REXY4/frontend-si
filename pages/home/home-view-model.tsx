import { useState } from "react";
import { getPbdcPerStoreUseCase } from "@/src/use-case/pbdc/get-per-store-use-case";
import { pbdcStoreImplementation } from "@/src/data/store-implementation/pbdc-store-implementation";
import { authStoreImplementation } from '@/src/data/store-implementation/auth-store-implementation';
import { settingStoreImplementation } from "@/src/data/store-implementation/setting-store-implementation";
import { useRouter } from "next/router";

const HomeViewModel = () => {
    const pbdcStore = pbdcStoreImplementation();
    const authStore = authStoreImplementation();
    const settingStore = settingStoreImplementation();
    let router = useRouter();

    const onLoadData = async (name:string) => {
         const { store }:any = authStore.auth;
         if(name === "/pbdc") {
            await getPbdcPerStoreUseCase(pbdcStore, store);
         }
    };

    return {
        onLoadData,
        isLoading: settingStore.isLoading
    };
};

export default HomeViewModel;
