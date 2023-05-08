import { AuthService } from "@/src/data/service/auth-service";
import { mapResponse } from "@/src/helpers/map-response";
import { AuthEntity } from "../entity/auth-entity";
import { LoginEntity } from "../entity/login-entity";
import { ResponseEntity } from "../entity/response-entity";

const login = async (
  loginEntity: LoginEntity
): Promise<ResponseEntity<AuthEntity>> => {
  return mapResponse(await AuthService.login(loginEntity));
};

const refreshLogin = async (
  refreshToken: string
): Promise<ResponseEntity<AuthEntity>> => {
  return mapResponse(await AuthService.refreshLogin(refreshToken));
};

const getDomain = async (
  username: string
): Promise<ResponseEntity<AuthEntity>> => {
  return mapResponse(await AuthService.getDomain(username));
};

export const AuthRepository = {
  login,
  refreshLogin,
  getDomain,
};
