import { LoginEntity } from "@/src/domain/entity/login-entity";
import { AuthRepository } from "@/src/domain/repository/auth-repository";
import { AuthActionType } from "../action-type/auth-action-type";
import { SettingActionType } from "../action-type/settting-action-type";

const loginAction = (loginEntity: LoginEntity) => async (dispatch: any) => {
  dispatch({ type: SettingActionType.SET_LOADING, isLoading: true });
  const response = await AuthRepository.login(loginEntity);
  dispatch({ type: AuthActionType.AUTH_LOGIN, payload: response });
  dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
  return response;
};

const logoutAction = () => (dispatch: any) => {
  dispatch({ type: AuthActionType.LOGOUT, payload: null });
};

const refreshLoginAction = (refreshToken: string) => async (dispatch: any) => {
  const response = await AuthRepository.refreshLogin(refreshToken);
  dispatch({ type: AuthActionType.REFRESH_LOGIN, payload: response });
  return response;
};

const getDomainAction = (username: string) => async (dispatch: any) => {
  dispatch({ type: SettingActionType.SET_LOADING, isLoading: true });
  const response = await AuthRepository.getDomain(username);
  dispatch({ type: AuthActionType.GET_DOMAIN, payload: response });
  dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
  return response;
};

export const AuthAction = {
  loginAction,
  logoutAction,
  refreshLoginAction,
  getDomainAction,
};
