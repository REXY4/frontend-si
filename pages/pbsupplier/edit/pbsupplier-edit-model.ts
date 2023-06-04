import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PbSuplImplementation } from '@/src/data/store-implementation/pbsupl-store-implementation';
import { UseCasePbSupp } from "@/src/use-case/pbsupl/pbsupl-use-case";
import {
 PbSuppDetailSaveDataEntity,
 PbSuppOverviewEntity,
 PbSuppPluValidationRequestEntity,
 PbSuppQtyOrderRequestEntity,
 PbSuppRequestSaveDataEntity
} from "@/src/domain/entity/pbsupl-entity";
import { authStoreImplementation } from "@/src/data/store-implementation/auth-store-implementation";
import { settingStoreImplementation } from "@/src/data/store-implementation/setting-store-implementation";
import { alertStoreImplementation } from '@/src/data/store-implementation/alert-store-implementation';
import { onlyValidationNumber } from "@/src/helpers/validation";

const PbSupplierEditModel = () => {
 const pbStore = PbSuplImplementation();
 const authStore = authStoreImplementation();
 const settingStore = settingStoreImplementation();
 const alertStore = alertStoreImplementation();
 const {
 validationPluUseCase,
 qtyOrderUseCase,
 addOverviewDraftUseCase,
 deleteOverviewDraftUseCase,
 saveUseCase,
} = UseCasePbSupp;
 const router = useRouter();
 const [plu, setPlu] = useState<string>("");
 const [disableBtnValidasiPlu, setDisableBtnValidasiPlu] = useState<boolean>(true);
const [disableBtnValidasiOrder, setDisableBtnValidasiOrder] = useState<boolean>(true);
const [openModalSave, setOpenModalSave] = useState<boolean>(false);
const [formAddDetailOrder, setAddFormDetailOrder] = useState<PbSuppDetailSaveDataEntity>({
    nour: 0,
    plu: "",
    conv: 0,
    qty: null,
    fr: null
});

 const handleDetected = (result:any) => {
  // masih update
  setPlu(result);
 };

 const handlePluValidation = async () => {
   const { store }:any = authStore.auth;
   settingStore?.setLoading(true);
   const body:PbSuppPluValidationRequestEntity = {
         store: store,
         plu: plu
     };
     await validationPluUseCase(pbStore, body);
 };

 const handleBack = async () => {
      settingStore?.setLoading(true);
      await pbStore?.clearAllData();
      router.push("/pbsupplier");
 };

 const handleBackForm = () => {
    settingStore?.setLoading(true);
    router.push("/pbsupplier/edit");
 };

 const handleNext = (url:string) => {
   settingStore?.setLoading(true);
   router.push(url);
 };

 const onChangeForm = (e:React.ChangeEvent<HTMLInputElement>) => {
   e.preventDefault();
    setAddFormDetailOrder({
      ...formAddDetailOrder,
       nour: pbStore?.overview?.length,
       plu: String(pbStore?.pluData?.plu),
       conv: parseInt(String(pbStore?.pluData?.fmisis)),
       [e.target.name]: onlyValidationNumber(e.target.value)
   });
 };

 const handleValidationOrder = async () => {
   const { store }:any = authStore.auth;
   const data : PbSuppQtyOrderRequestEntity = {
       store: store,
       plu: String(pbStore?.pluData?.plu),
       konversi: pbStore?.pluData?.fmisis,
       qty: formAddDetailOrder.qty,
       fr: formAddDetailOrder.fr
   };
   await qtyOrderUseCase(pbStore, data);
 };

 const handleAddDraftDetailItem = async () => {
   settingStore?.setLoading(true);
   const data:PbSuppOverviewEntity = {
      fdnour: String(pbStore.overview.length + 1),
       plu: String(pbStore?.pluData?.plu),
       desc: String(pbStore?.pluData?.desc),
       conv: String(pbStore?.pluData?.fmisis),
       qty: String(formAddDetailOrder.qty),
       fr: formAddDetailOrder.fr
     };
     await addOverviewDraftUseCase(pbStore, data);
     await router.push("/pbsupplier/edit");
   };

 const handleDeleteItem = async (plu:string) => {
    await deleteOverviewDraftUseCase(pbStore, plu);
 };

 const handleSaveData = async () => {
  const { store }:any = authStore.auth;
  setOpenModalSave(false);
  settingStore?.setLoading(true);
  const data:PbSuppRequestSaveDataEntity = {
    store: store,
    nopb: String(pbStore?.detailData?.nopb),
    detailItemPbSupplier: pbStore?.overview?.map((item:any, index:number) => {
      return {
          nour: index + 1,
          plu: String(item.plu),
          conv: parseInt(item.conv),
          qty: parseInt(item.qty),
          fr: parseInt(item.fr)
      };
    })
  };
    await saveUseCase(pbStore, data);
 };

 // disable button plu
 useEffect(() => {
    if(plu === "") {
     return setDisableBtnValidasiPlu(true);
    }
    return setDisableBtnValidasiPlu(false);
 }, [plu]);

// disable button plu
 useEffect(() => {
    if(formAddDetailOrder.qty === null || formAddDetailOrder.fr === null) {
     return setDisableBtnValidasiOrder(true);
    }
    return setDisableBtnValidasiOrder(false);
 }, [formAddDetailOrder.qty, formAddDetailOrder.fr]);

 useEffect(() => {
  alertStore?.setAlert(false, "");
   settingStore?.setLoading(false);
 }, []);

    return{
        alerts: {
         isOpen: alertStore?.isOpen,
         message: alertStore?.message,
         statusData: pbStore?.status,
         setAlert: alertStore?.setAlert
        },
        nopb: pbStore?.noPb,
        dataPb: pbStore?.detailData,
        overview: pbStore?.overview,
        pluData: pbStore?.pluData,
        disableBtnValidasiPlu,
        isLoading: settingStore?.isLoading,
        openModalSave,
        disableBtnValidasiOrder,
        handleBack,
        setPlu,
        handleDetected,
        handlePluValidation,
        handleNext,
        handleValidationOrder,
        onChangeForm,
        handleBackForm,
        handleAddDraftDetailItem,
        setOpenModalSave,
        handleDeleteItem,
        handleSaveData,
    };
};

export default PbSupplierEditModel;
