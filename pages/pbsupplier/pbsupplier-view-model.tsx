import { useRouter } from "next/router";
import { settingStoreImplementation } from '@/src/data/store-implementation/setting-store-implementation';
import { dcStoreUseCase } from "@/src/use-case/dc/dc-use-case";
import dcImplementation from "@/src/data/store-implementation/dc-store-implementation";
import { useCallback, useEffect } from "react";

const PbsupllierViewModel = () => {
    let router = useRouter();
    const settingStore = settingStoreImplementation();
    const dcStore = dcImplementation();

    const dataPbSupplier = [
           {
                        id: 0,
                        cab: "0001",
                        nopb: "PB0E25001",
                        tipe: "1",
                        dc: "0970",
                        tgl: "2020-05-25T10:48:00",
                        nilai: 1276503166.91,
                        status: "SBOS"
            },
    ];

    const onloadDc = useCallback(async () => {
        await dcStoreUseCase(dcStore, "0001");
    }, [dcStore?.dc]);

    const handleAddPbSupplier = async () => {
        await settingStore?.setLoading(true);
        router.push("/pbsupplier/add");
    };

    useEffect(() => {
        onloadDc();
    }, []);

    return {
        dataPbSupplier,
        isLoading: settingStore?.isLoading,
        handleAddPbSupplier
    };
};

export default PbsupllierViewModel;
