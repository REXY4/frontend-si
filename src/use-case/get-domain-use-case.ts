import { AuthStore } from "../domain/store/auth-store";

const getDomainUseCase = async (store: AuthStore, username: string) => {
    await store.getDomain(username);
};

export { getDomainUseCase };
