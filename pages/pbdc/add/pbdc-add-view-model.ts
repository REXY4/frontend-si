/* eslint-disable no-lonely-if */
import dcImplementation from "@/src/data/store-implementation/dc-store-implementation";
import { pbdcStoreImplementation } from '@/src/data/store-implementation/pbdc-store-implementation';
import { postPbdcCheckRosso } from "@/src/use-case/pbdc/check-rosso-use-case";
import React, { useCallback, useEffect, useState } from "react";
import { authStoreImplementation } from '@/src/data/store-implementation/auth-store-implementation';
import { settingStoreImplementation } from '@/src/data/store-implementation/setting-store-implementation';
import { useRouter } from "next/router";
import { dcStoreUseCase } from "@/src/use-case/dc/dc-use-case";
import { postPluValidationUseCase } from "@/src/use-case/pbdc/post-plu-validation-use-case";
import { postPbdcVerifyUseCase } from "@/src/use-case/pbdc/post-pbdc-verify-use-case";
import { postPbdcSaveData } from "@/src/use-case/pbdc/post-save-data-pbdc-use-case";
import { alertStoreImplementation } from '@/src/data/store-implementation/alert-store-implementation';
import { FormDetailItemPbdc } from "@/src/domain/entity/pbdc-entity";
import { validationJustNumber } from "@/src/helpers/validation";
import { PbdcStore } from '@/src/domain/store/pbdc-store';

const PbdcAddViewModel = () => {
    const authStore = authStoreImplementation();
    const dcStore = dcImplementation();
    const pbdcStore = pbdcStoreImplementation();
    const settingStore = settingStoreImplementation();
    const alertStore = alertStoreImplementation();
    let router = useRouter();
    const [plu, setPlu] = useState<string>("");
    const [formDc, setFormDc] = useState<string>("");
    const [disableBtnAddPlu, setDisableBtnAddPlu] = useState<boolean>(true);
    const [disableBtnAddDetailItem, setDisableBtnAddPluDetailItem] = useState<boolean>(true);
    const [alertSaveData, setAlertSaveData] = useState<boolean>(false);
    const [sameValuePlu, setSameValuePlu] = useState<boolean>(false);
    const [formDetailItem, setFormDetailItem] = useState<FormDetailItemPbdc>({
        nour: "",
        plu: "",
        eq: "",
        order: ""
    });

    const [formEditDetailItem, setFormEditDetailItem] = useState<FormDetailItemPbdc>({
        nour: "",
        plu: "",
        eq: "",
        order: ""
    });

    const checkPbdcRosso = useCallback(async () => {
         const { store }:any = authStore.auth;
         await postPbdcCheckRosso(pbdcStore, store);
    }, [pbdcStore?.checkRosso]);

     const onLoadAllDc = useCallback(async () => {
        const { store }:any = authStore.auth;
        await dcStoreUseCase(dcStore, store);
    }, [dcStore?.dc]);

    const onPostPluValidation = useCallback(async (plu : string, dc :string) => {
        const { store }:any = authStore.auth;
        const sameValuePlu = pbdcStore?.detailItemPbdc !== undefined
        && pbdcStore?.detailItemPbdc.filter((fil:any) => fil.plu === plu)[0];
        if(pbdcStore?.detailItemPbdc[0] !== undefined && sameValuePlu !== undefined) {
            setSameValuePlu(true);
            await alertStore.setAlert(true, "PLU Sudah Ada!");
        }else{
            setSameValuePlu(false);
            await postPluValidationUseCase(pbdcStore, store, plu, dc);
        }
    }, [pbdcStore?.statusPluValidation]);

    const onPostVerify = useCallback(async (dc:string) => {
        const { store }:any = authStore.auth;
        await postPbdcVerifyUseCase(pbdcStore, store, "", dc);
    }, [pbdcStore?.pbdcStatusVerify]);

    const onPostSaveData = useCallback(async (dc:string) => {
        const { store }:any = authStore.auth;
        if(pbdcStore?.selectDc === "") {
            setAlertSaveData(true);
        }else{
            await postPbdcSaveData(pbdcStore, store, "", pbdcStore?.selectDc, pbdcStore?.detailItemPbdc);
            await router.push("/pbdc");
            await settingStore?.setLoading(true);
        }
    }, [pbdcStore?.pbdcStatusSave]);

    const handleBack = async () => {
        await settingStore.setLoading(true);
        router.push("/pbdc");
    };

    const handleDetected = (result:any) => {
        setPlu(result);
    };

    const handleRoute = (link:string) => {
        return router.push(link);
    };

    const onEditDetailItemPbdc = async () => {
        await pbdcStore?.editDetailItemPbdc(formEditDetailItem);
        await router.push("/pbdc/add");
    };

    const handleDetailItemPbdc = async () => {
        await pbdcStore.addDetailItemPbdc(formDetailItem);
        await router.push("/pbdc/add");
    };

    const onChangeDetailItem = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormDetailItem({
            ...formDetailItem,
            [e.target.name]: validationJustNumber(e.target.value),
            plu: pbdcStore?.pluValidation?.plu
        });
    };

    const onChangeEditDetailItem = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormEditDetailItem({
            ...formEditDetailItem,
            [e.target.name]: validationJustNumber(e.target.value),
        });
    };

     const onGetDetailItemPbdc = async (data:FormDetailItemPbdc) => {
        console.log("action dong");
        await pbdcStore?.getDetailItemPbdc(data);
        await router.push("/pbdc/add/formedit");
    };

    useEffect(() => {
        alertStore.setAlert(false, "");
        settingStore.setLoading(false);
        checkPbdcRosso();
        onLoadAllDc();
    }, []);

    useEffect(() => {
        // if(!pbdcStore?.checkRosso) {
        //     setDisableBtnAddPlu(true);
        // }else{
        if(plu === "" || formDc === "") {
            setDisableBtnAddPlu(true);
        }else{
            setDisableBtnAddPlu(false);
        }
        // }
   }, [plu, formDc, pbdcStore?.checkRosso]);
   // handledisable button form detail
   console.log("check dc", formDc);
   const handleDisableAddPbdc = () => {
    if(formDetailItem.eq === ""
    || formDetailItem.nour === ""
    || formDetailItem.order == ""
    ) {
        setDisableBtnAddPluDetailItem(true);
    }else{
        setDisableBtnAddPluDetailItem(false);
    }
   };
    const handleDisableEditPbdc = () => {
    if(formEditDetailItem.eq === ""
    || formEditDetailItem.nour === ""
    || formEditDetailItem.order == ""
    ) {
        setDisableBtnAddPluDetailItem(true);
    }else{
        setDisableBtnAddPluDetailItem(false);
    }
   };
   useEffect(() => {
        handleDisableAddPbdc();
        handleDisableEditPbdc();
   }, [formDetailItem, formEditDetailItem]);

   useEffect(() => {
        if(pbdcStore?.fieldEditItem !== undefined) {
            setFormEditDetailItem({
                ...formEditDetailItem,
                ...pbdcStore?.fieldEditItem,
            });
        }
   }, []);

   useEffect(() => {
    pbdcStore?.setSelectDc(formDc);
   }, [formDc]);

    return{
        checkRosso: pbdcStore?.checkRosso,
        dc: dcStore?.dc,
        plu,
        pluValidation: pbdcStore?.pluValidation,
        isLoadingBtnPlu: pbdcStore?.isLoadingBtnPluValidation,
        isLoading: settingStore?.isLoading,
        isOpenAlert: alertStore?.isOpen,
        messageAlert: alertStore?.message,
        statusCheckPlu: pbdcStore.statusPluValidation,
        detailItemPbdc: pbdcStore?.detailItemPbdc,
        fieldEdit: pbdcStore?.fieldEditItem,
        // action'
        formEditDetailItem,
        setAlert: alertStore?.setAlert,
        setPlu,
        setFormDc,
        formDc: pbdcStore?.selectDc,
        disableButtonDetailItem: disableBtnAddDetailItem,
        handleDetailItemPbdc,
        disableBtnAddPlu,
        sameValuePlu,
        setAlertSaveData,
        alertSaveData,
        onEditDetailItemPbdc,
        onGetDetailItemPbdc,
        onPostPluValidation,
        onChangeDetailItem,
        handleBack,
        onChangeEditDetailItem,
        onPostSaveData,
        handleDetected,
        handleRoute,
        deleteItemPbdc: pbdcStore?.deleteDetailItemPbdc
    };
};

export default PbdcAddViewModel;
