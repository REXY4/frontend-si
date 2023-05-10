import { SettingActionType } from '../action-type/settting-action-type';

const setApplicationName = (applicationName: string) => (dispatch: any) => {
  dispatch({ type: SettingActionType.SET_APPLICATION_NAME, applicationName });
};

const setAlertMessage = (message: string) => (dispatch: any) => {
  dispatch({ type: SettingActionType.SET_ALERT_MESSAGE, message });
};

const setLoading = (isLoading: boolean) => (dispatch: any) => {
  dispatch({ type: SettingActionType.SET_LOADING, isLoading });
};

const setOpenAlert = (isOpenAlert: boolean) => (dispatch: any) => {
  dispatch({ type: SettingActionType.SET_OPEN_ALERT, isOpenAlert });
};

export const SettingAction = {
  setApplicationName,
  setAlertMessage,
  setLoading,
  setOpenAlert,
};
