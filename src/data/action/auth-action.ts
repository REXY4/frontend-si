import { LoginEntity } from '@/src/domain/entity/login-entity';
import { AuthRepository } from '@/src/domain/repository/auth-repository';
import { AuthActionType } from '../action-type/auth-action-type';
import { AlertActionType } from '../action-type/alert-action-type';
import { SettingActionType } from '../action-type/settting-action-type';

const loginAction = (loginEntity: LoginEntity) => async (dispatch: any) => {
  try {
  dispatch({ type: SettingActionType.SET_LOADING, isLoading: true });
    const response = await AuthRepository.login(loginEntity);
    if (response.returnType === "E") {
       dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
       dispatch({
          type: AlertActionType.SET_ALERTS,
          isOpen: true,
          message: response.returnMessage
      });
    } else {
       dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
       dispatch({ type: AuthActionType.AUTH_LOGIN, payload: response });
      return response;
    }
  } catch (err) {
      dispatch({ type: SettingActionType.SET_LOADING, isLoading: false });
      dispatch({
          type: AlertActionType.SET_ALERTS,
          isOpen: true,
          message: "Login Failed!"
      });
  }
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
