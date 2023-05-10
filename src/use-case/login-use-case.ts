import { LoginEntity } from "../domain/entity/login-entity";
import { AuthStore } from "../domain/store/auth-store";

const loginUseCase = async (
    store: AuthStore,
    username: string,
    password: string
) => {
    await store.authLogin(
        createParams((username = username), (password = password))
    );
};

const createParams = (username: string, password: string): LoginEntity => {
    let result: LoginEntity = {
        username: username,
        password: password,
    };
    return result;
};

export { loginUseCase };
