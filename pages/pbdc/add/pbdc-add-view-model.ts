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
import { validationJustNumber, validationText } from "@/src/helpers/validation";
import { PbdcStore } from '@/src/domain/store/pbdc-store';
import { AlertStore } from '@/src/domain/store/alert-store';
import { deleteAlllItemDraftUseCase } from "@/src/use-case/pbdc/delete-draft-detail-use-case";

const PbdcAddViewModel = () => {
    const authStore = authStoreImplementation();
    const dcStore = dcImplementation();
    const pbdcStore = pbdcStoreImplementation();
    const settingStore = settingStoreImplementation();
    const alertStore = alertStoreImplementation();
    let router = useRouter();
    const [plu, setPlu] = useState<string>("");
    const [disableBtnAddPlu, setDisableBtnAddPlu] = useState<boolean>(true);
    const [disableBtnAddDetailItem, setDisableBtnAddPluDetailItem] = useState<boolean>(true);
    const [disableBtnEditDetailItem, setDisableBtnEditPluDetailItem] = useState<boolean>(true);
    const [valuePluSame, setValuePluSame] = useState<boolean>(false);
    const [openModalSave, setOpenModalSave] = useState<boolean>(false);
    const [formDetailItem, setFormDetailItem] = useState<FormDetailItemPbdc>({
        nour: "",
        plu: "",
        eq: "",
        desc: "",
        order: ""
    });

    const [formEditDetailItem, setFormEditDetailItem] = useState<FormDetailItemPbdc>({
        nour: "",
        plu: "",
        eq: "",
        desc: "",
        order: ""
    });

    const onPostPluValidation = useCallback(async (plu : string, dc :string) => {
        const { store }:any = authStore.auth;
        const valuePluSame = pbdcStore?.detailItemPbdc !== undefined
        && pbdcStore?.detailItemPbdc.filter((fil:any) => fil.plu === plu)[0];
        if(pbdcStore?.detailItemPbdc[0] !== undefined && valuePluSame !== undefined) {
            setValuePluSame(true);
            await alertStore.setAlert(true, "PLU Sudah Ada!");
        }else{
            setValuePluSame(false);
            await postPluValidationUseCase(pbdcStore, store, plu, dc);
        }
    }, [pbdcStore?.statusPluValidation]);

    const onPostSaveData = async () => {
        const { store }:any = authStore.auth;
            settingStore?.setLoading(true);
            await postPbdcSaveData(pbdcStore, store, "", dcStore?.selectDc, pbdcStore?.detailItemPbdc);
            await router.push("/pbdc");
};

    const handleBack = async () => {
        settingStore.setLoading(true);
        await deleteAlllItemDraftUseCase(pbdcStore);
        await dcStore?.setSelectDc("");
        router.push("/pbdc");
    };

    const handleBackForm = async () => {
        settingStore.setLoading(true);
        router.push("/pbdc/add");
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

    const handleSaveDetailItemPbdc = async () => {
        settingStore?.setLoading(true);
        alertStore?.setAlert(false, "");
        await pbdcStore.addDetailItemPbdc(formDetailItem);
        await router.push("/pbdc/add");
    };

    const onChangeDetailItem = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormDetailItem({
            ...formDetailItem,
            order: validationJustNumber(e.target.value),
        });
    };

    const onChangeEditDetailItem = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormEditDetailItem({
            ...formEditDetailItem,
            order: validationJustNumber(e.target.value),
        });
    };

     const onGetDetailItemPbdc = async (data:FormDetailItemPbdc) => {
        settingStore?.setLoading(true);
        await pbdcStore?.getDetailItemPbdc(data);
        await router.push("/pbdc/add/formedit");
    };

    const handleNext = (link:string) => {
        settingStore?.setLoading(true);
        router.push(link);
    };

    useEffect(() => {
        if(plu === "" || dcStore?.selectDc === "") {
            setDisableBtnAddPlu(true);
        }else{
            setDisableBtnAddPlu(false);
        }
   }, [plu, dcStore?.selectDc]);

   // disable button form add
    useEffect(() => {
     if(formEditDetailItem.order === ""
    ) {
        setDisableBtnEditPluDetailItem(true);
    }else{
        setDisableBtnEditPluDetailItem(false);
    }
   }, [formEditDetailItem]);

   // handledisable button form edit
   useEffect(() => {
     if(formDetailItem.eq === ""
    || formDetailItem.nour === ""
    || formDetailItem.order == ""
    ) {
        setDisableBtnAddPluDetailItem(true);
    }else{
        setDisableBtnAddPluDetailItem(false);
    }
}, [formDetailItem]);

   useEffect(() => {
    alertStore?.setAlert(false, "");
    settingStore?.setLoading(false);
     setFormDetailItem({
        ...formDetailItem,
         nour: String(parseInt(pbdcStore?.detailItemPbdc.length) + 1),
         plu: pbdcStore?.pluValidation?.plu,
         eq: pbdcStore?.pluValidation?.fmisis,
         desc: pbdcStore?.pluValidation?.fmsing,
    });
        if(pbdcStore?.fieldEditItem !== undefined) {
            setFormEditDetailItem({
                ...formEditDetailItem,
                ...pbdcStore?.fieldEditItem
            });
        }
   }, []);

    return{
        setAlert: alertStore?.setAlert,
        valuePluSame,
        statusPlu: pbdcStore?.statusPluValidation,
        alerts: {
            open: alertStore?.isOpen,
            message: alertStore?.message,
        },
        checkRosso: pbdcStore?.checkRosso,
        dc: dcStore?.dc,
        plu,
        formDetailItem,
        pluValidation: pbdcStore?.pluValidation,
        isLoading: settingStore?.isLoading,
        detailItemPbdc: pbdcStore?.detailItemPbdc,
        fieldEdit: pbdcStore?.fieldEditItem,
        handleNext,
        // action'
        disableBtnEditDetailItem,
        formEditDetailItem,
        setPlu,
        setFormDc: dcStore?.setSelectDc,
        formDc: dcStore?.selectDc,
        disableButtonDetailItem: disableBtnAddDetailItem,
         handleSaveDetailItemPbdc,
        disableBtnAddPlu,
        onEditDetailItemPbdc,
        onGetDetailItemPbdc,
        onPostPluValidation,
        onChangeDetailItem,
        handleBack,
        handleBackForm,
        onChangeEditDetailItem,
        onPostSaveData,
        handleDetected,
        handleRoute,
        openModalSave,
        setOpenModalSave,
        deleteItemPbdc: pbdcStore?.deleteDetailItemPbdc
    };
};

export default PbdcAddViewModel;
