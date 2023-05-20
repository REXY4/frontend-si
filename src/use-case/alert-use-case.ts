import { AlertStore } from '@/src/domain/store/alert-store';

const alertUseCase = async (
    store : AlertStore,
    isOpen : boolean,
    message : string
) => {
    await store.setAlert(isOpen, message);
};
export { alertUseCase };
