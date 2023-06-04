import { UserEntity, RequestUserEntity } from "../entity/user-entity";
import { ResponseEntity } from "../entity/response-entity";
import { BaseStore } from "./base-store";

interface UserStore extends BaseStore {
    users: [UserEntity] | any;
    userById: UserEntity | any;
    getUsers(name?: string): Promise<ResponseEntity<[UserEntity]>>;
    submit(
        isEdit: boolean,
        request: RequestUserEntity
    ): Promise<ResponseEntity<UserEntity>>;
    remove(id: number): Promise<ResponseEntity<UserEntity>>;
}

export type { UserStore };
