import { AlertActionType } from "../action-type/alert-action-type";

const setOpenAlert = (isOpen: boolean, message:string) => (dispatch: any) => {
  dispatch({ type: AlertActionType.ALERT, isOpen, message });
};

export const alertAction = {
    setOpenAlert
};
