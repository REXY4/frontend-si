import { removeCookies } from "cookies-next";
import {
    AnyAction,
    applyMiddleware,
    combineReducers,
    createStore,
} from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { AuthActionType } from "../action-type/auth-action-type";
import { authReducer } from "../reducer/auth-reducer";
import { initReducer } from "../reducer/init-reducer";
import { settingReducer } from "../reducer/setting-reducer";
import { userReducer } from "../reducer/user-reducer";
import { pbdcReducer } from "../reducer/pbdc-reducer";
import { alertReducer } from "../reducer/alert-reducer";

const rootReducer = combineReducers({
    setting: settingReducer,
    user: userReducer,
    auth: authReducer,
    init: initReducer,
    pbdc: pbdcReducer,
    alert: alertReducer,
});

const rootActionReducers = (state: any, action: AnyAction) => {
    if (action.type === AuthActionType.LOGOUT) {
        storage.removeItem("persist:root");
        removeCookies("token");
        return rootReducer(undefined, action);
    }
    return rootReducer(state, action);
};

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["setting", "auth", "init", "user", "pbdc"],
    blacklist: ["alert"]
};

const persistedReducer = persistReducer(persistConfig, rootActionReducers);

const appStoreImplementation = createStore(
    persistedReducer,
    applyMiddleware(thunk)
);

const appPersistor = persistStore(appStoreImplementation);

type AppRootState = ReturnType<typeof appStoreImplementation.getState>;

export { appStoreImplementation, appPersistor };
export type { AppRootState };
