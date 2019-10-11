import * as actions from '@store/actions/users.actions';
import { UserType } from '@app/types/common.types';

export interface State {
  users: UserType[];
  user: UserType;
  total: number;
}

export const initialState: State = {
  users: [],
  user: {} as UserType,
  total: 0
};

export function reducer(state = initialState, action: actions.UsersActions) {
  switch (action.type) {
    case actions.UserActionType.GET_USERS_SUCCESS: {
      return {
        ...state,
        users: [...action.payload.entities],
        user: (state.user && state.user.id) ? state.user : action.payload.entities[0],
        total: action.payload.total
      };
    }
    case actions.UserActionType.ADD_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload
      };
    }
    case actions.UserActionType.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload
      };
    }
    case actions.UserActionType.DELETE_USER_SUCCESS: {
      return {
        ...state
      };
    }
    case actions.UserActionType.GET_USER_BY_ID_SUCCESS: {
      return {
        ...state,
        user: action.payload
      };
    }
    case actions.UserActionType.SET_USER: {
      return {
        ...state,
        user: action.payload || {}
      };
    }
    default:
      return state;
  }
}
