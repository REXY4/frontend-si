import { AuthEntity } from "../entity/auth-entity";
import { LoginEntity } from "../entity/login-entity";
import { ResponseEntity } from "../entity/response-entity";
import { BaseStore } from "./base-store";

interface AuthStore extends BaseStore {
    auth: AuthEntity
    validation: any,
    status : any
    // Actions
    // authLogin(LoginEntity: LoginEntity): Promise<ResponseEntity<AuthEntity>>;
    authLogin : any
    logout(): void;
    authRefreshToken(refreshToken: string): Promise<ResponseEntity<AuthEntity>>;
    getDomain(username: string): Promise<ResponseEntity<AuthEntity>>;
}

export type { AuthStore };
