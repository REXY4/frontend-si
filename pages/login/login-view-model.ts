import { authStoreImplementation } from '@/src/data/store-implementation/auth-store-implementation';
import { settingStoreImplementation } from '@/src/data/store-implementation/setting-store-implementation';
import { getDomainUseCase } from '@/src/use-case/get-domain-use-case';
import { loginUseCase } from '@/src/use-case/login-use-case';
import { useCallback, useEffect } from 'react';

const LoginViewModel = () => {
  const authStore = authStoreImplementation();
  const settingStore = settingStoreImplementation();

  const onGetDomainClicked = useCallback(
    async (username: string) => {
      await getDomainUseCase(authStore, username);
    },
    [authStore?.auth],
  );

  const onLoginClicked = useCallback(
    async (username: string, password: string) => {
      await loginUseCase(authStore, username, password);
    },
    [authStore?.auth],
  );

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
    alertMessage: settingStore.alertMessage,
    isOpenAlert: settingStore.isOpenAlert,
    onGetDomainClicked,
    onLoginClicked,
  };
};

export default LoginViewModel;
