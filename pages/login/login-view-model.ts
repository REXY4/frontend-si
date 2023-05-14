import { alertStoreImplementation } from '@/src/data/store-implementation/alert-store-implementation';
import { authStoreImplementation } from '@/src/data/store-implementation/auth-store-implementation';
import { settingStoreImplementation } from '@/src/data/store-implementation/setting-store-implementation';
import { alertUseCase } from '@/src/use-case/alert-use-case';
import { getDomainUseCase } from '@/src/use-case/get-domain-use-case';
import { loginUseCase } from '@/src/use-case/login-use-case';
import { useCallback, useEffect } from 'react';
import { ResponseEntity } from '../../src/domain/entity/response-entity';

const LoginViewModel = () => {
  const authStore = authStoreImplementation();
  const settingStore = settingStoreImplementation();
  const alertStore = alertStoreImplementation();

  const onGetDomainClicked = useCallback(
    async (username: string) => {
      await getDomainUseCase(authStore, username);
    },
    [authStore?.auth],
  );

  const onLoginClicked = async (username: string, password: string) => {
      try {
        const response:any = await loginUseCase(authStore, username, password);
        await settingStore.setLoading(true);
        if (response.data.returnType === "S") {
          await settingStore.setLoading(false);
          await alertUseCase(alertStore, true, "login failed!, Please Check your Staff Id and Password");
        } else {
            await settingStore.setLoading(false);
        }
      } catch (err) {
        await alertUseCase(alertStore, true, "login failed!, internal server error");
        await settingStore.setLoading(false);
      }
    };

  const onOpenAlertClicked = useCallback(async (isOpen:boolean, message:string) => {
      await alertUseCase(alertStore, isOpen, message);
    }, [alertStore.isOpen]);

  useEffect(() => {
    if (
      authStore?.auth?.token !== null
            && authStore?.auth?.token?.length > 0
    ) {
      window.location.href = `${window.location.origin}/home`;
    }
  }, [authStore]);

  return {
    auth: authStore?.auth,
    isLoading: settingStore?.isLoading,
    alertMessage: alertStore?.message,
    isOpenAlert: alertStore?.isOpen,
    onOpenAlertClicked,
    onGetDomainClicked,
    onLoginClicked,
  };
};

export default LoginViewModel;
