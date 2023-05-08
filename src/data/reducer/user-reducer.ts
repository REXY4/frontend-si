import type { AnyAction } from "redux";
import { UserStore } from "@/src/domain/store/user-store";
import { UserActionType } from "../action-type/user-action-type";
import { MapStateReducers } from "@/src/helpers/map-state-reducers";

type UserStoreState = Omit<UserStore, "getUsers" | "submit" | "remove">;

const INITIAL_STATE: UserStoreState = {
  users: undefined,
  userById: undefined,
  validation: undefined,
  status: undefined,
};

const userReducer = (
  state: UserStoreState = INITIAL_STATE,
  action: AnyAction
) => {
  switch (action.type) {
    case UserActionType.GET_ALL_USER:
      return {
        ...state,
        users: action.payload.data ?? [],
        status: action?.payload?.status,
        validation: action?.payload?.validation ?? [],
      };
    case UserActionType.SUBMIT_USER:
      if (action.payload?.status?.isError) {
        return {
          ...state,
          status: action.payload?.status,
          validation: action?.payload?.validation,
        };
      }
      const item = {
        id: action.payload.id,
        name: action.payload.name,
        menus: action.payload.menus,
      };
      if (!item) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        users: MapStateReducers.addItemStateList(state?.users, item),
      };
    case UserActionType.UPDATE_USER:
      if (action.payload?.status?.isError) {
        return {
          ...state,
          status: action.payload?.status,
          validation: action?.payload?.validation,
        };
      }
      const items = [
        {
          id: action.payload.id,
          name: action.payload.name,
          menus: action.payload.menus,
        },
      ];
      if (!items) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        users: MapStateReducers.updateStateList(state?.users, items),
      };
    case UserActionType.REMOVE_USER:
      return {
        ...state,
        users: MapStateReducers.removeItemStateList(
          state?.users,
          action.payload
        ),
      };
    default:
      return state;
  }
};

export { userReducer };
export type { UserStoreState };
