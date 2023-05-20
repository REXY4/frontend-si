export interface UserEntity {
    id: number;
    username: string;
    name: string;
    token: string;
    expired_at: Date;
    domain: string;
    domainid: string;
    isAD: boolean;
}

export interface RequestUserEntity extends UserEntity {
    password: string;
}
