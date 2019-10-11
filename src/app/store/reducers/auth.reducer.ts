import * as actions from '@store/actions/auth.actions';
import { UserType } from '@app/types/common.types';

export interface State {
  me: UserType;
}

export const initialState: State = {
  me: null
};

export function reducer(state = initialState, action: actions.AuthActions) {
  switch (action.type) {
    case actions.AuthActionType.GET_ME_SUCCESS: {
      return {
        ...state,
        me: action.payload
      };
    }
    case actions.AuthActionType.LOGOUT_SUCCESS: {
      return {
        ...state,
        me: null
      };
    }
    default:
      return state;
  }
}

