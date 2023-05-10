import { appStoreImplementation } from "@/src/data/store-implementation/app-store-implementation";
import { SettingActionType } from "../data/action-type/settting-action-type";
import Router from "next/router";

const getIdFromApiUrl = (url: string) => {
    const result = url.slice(0 - 1);
    const parts = result.split("/");
    return parts[parts.length - 1];
};

const isLoggedIn = () => {
    const authState = appStoreImplementation.getState().auth;
    return authState.auth?.access ?? false;
};

const getAuthState = () => {
    const authState = appStoreImplementation.getState().auth;
    return authState;
};

// const authorizePage = async (currentUrl: string) => {
//   const initState = appStoreImplementation.getState().init;
//   // const menuAllowed = initState?.menus?.map((menu) => menu.url);

//   if (menuAllowed?.indexOf(currentUrl) === -1) {
//     Router.push("/unauthorized");
//   }
// };

export const Utils = {
    getIdFromApiUrl,
    isLoggedIn,
    getAuthState,
};
