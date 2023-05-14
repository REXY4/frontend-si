import { logoutUseCase } from '@/src/use-case/logout-use-case';
import { useCallback } from 'react';
import { authStoreImplementation } from '@/src/data/store-implementation/auth-store-implementation';

const LayoutModel = () => {
    const logout = useCallback(async () => {
        authStoreImplementation().logout();
    }, []);

    return {
        logout
    };
};

export default LayoutModel;
