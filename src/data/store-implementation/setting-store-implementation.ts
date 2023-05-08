import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import getConfig from "next/config";
import { SettingStore } from "@/src/domain/store/setting-store";
import { SettingStoreState } from "../reducer/setting-reducer";
import type { AppRootState } from "./app-store-implementation";
import { SettingAction } from "../action/setting-action";

const selector = (state: AppRootState) => state.setting;

const settingStoreImplementation = (): SettingStore => {
  const dispatch = useDispatch();
  const { publicRuntimeConfig } = getConfig();
  const applicationName = `${publicRuntimeConfig.applicationName}`;
  const { isLoading, isOpenAlert, alertMessage } = useSelector<
    AppRootState,
    SettingStoreState
  >(selector);

  const setApplicationName = useCallback(
    (applicationName: string) =>
      SettingAction.setApplicationName(applicationName)(dispatch),
    [dispatch]
  );
  const setLoading = useCallback(
    (isLoading: boolean) => SettingAction.setLoading(isLoading)(dispatch),
    [dispatch]
  );
  const setAlertMessage = useCallback(
    (message: string) => SettingAction.setAlertMessage(message)(dispatch),
    [dispatch]
  );
  const setOpenAlert = useCallback(
    (isOpenAlert: boolean) => SettingAction.setOpenAlert(isOpenAlert)(dispatch),
    [dispatch]
  );

  return {
    applicationName,
    isLoading,
    isOpenAlert,
    alertMessage,
    setApplicationName,
    setLoading,
    setAlertMessage,
    setOpenAlert,
  };
};

export { settingStoreImplementation };
