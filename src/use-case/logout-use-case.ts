import { AuthStore } from "../domain/store/auth-store";

const logoutUseCase = async (store: AuthStore) => {
  await store.logout();
};

export { logoutUseCase };
