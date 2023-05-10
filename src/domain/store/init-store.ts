import { ResponseEntity } from "../entity/response-entity";
import { UserEntity } from "../entity/user-entity";
import { BaseStore } from "./base-store";

interface InitStore extends BaseStore {
    user: UserEntity;
    initUser(name?: string): Promise<ResponseEntity<UserEntity>>;
}

export type { InitStore };
