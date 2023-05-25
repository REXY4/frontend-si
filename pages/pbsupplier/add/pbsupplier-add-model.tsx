import dcImplementation from "@/src/data/store-implementation/dc-store-implementation";
import PbsupllierViewModel from "../pbsupplier-view-model";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PbSupplierAddModel = () => {
 const [plu, setPlu] = useState<string>("");
 const [disableBtnValidasiPlu, setDisableBtnValidasiPlu] = useState<boolean>(true);
 const dcStore = dcImplementation();
 const router = useRouter();

 const handleDetected = () => {

 };

 const handleBack = () => {
    router.back();
 };

 // disable button plu
 useEffect(() => {
    if(plu === "") {
     return setDisableBtnValidasiPlu(true);
    }
    return setDisableBtnValidasiPlu(false);
 }, [plu]);

    return{
        dataDc: dcStore?.dc,
        handleBack,
        setSelectDc: dcStore?.setSelectDc,
        dcSelected: dcStore?.selectDc,
        setPlu,
        disableBtnValidasiPlu,
        handleDetected,
    };
};

export default PbSupplierAddModel;
