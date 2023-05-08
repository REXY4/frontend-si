import { ResponseEntity } from "../entity/response-entity";

interface SettingStore {
  applicationName: string;
  alertMessage: string;
  isLoading: boolean | false;
  isOpenAlert: boolean | false;

  setApplicationName(applicationName: string): void;
  setAlertMessage(message: string): void;
  setLoading(isLoading: boolean): void;
  setOpenAlert(isOpenAlert: boolean): void;
}

export type { SettingStore };
