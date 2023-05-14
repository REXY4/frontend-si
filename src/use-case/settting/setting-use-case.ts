import { SettingStore } from "@/src/domain/store/setting-store";

const loading = async (store:SettingStore, isLoading:boolean) => {
    await store.setLoading(isLoading);
};

const SettingUseCase = {
    loading
};

export { SettingUseCase };
