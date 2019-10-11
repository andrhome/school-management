import * as actions from '@store/actions/schools.actions';
import { SchoolType } from '@app/types/common.types';

export interface State {
  schools: Array<SchoolType>;
  school: SchoolType;
  total: number;
}

export const initialState: State = {
  schools: [],
  school: {} as SchoolType,
  total: 0
};

export function reducer(state = initialState, action: actions.SchoolsActions) {
  switch (action.type) {
    case actions.SchoolActionType.GET_SCHOOLS_SUCCESS: {
      return {
        ...state,
        schools: [...action.payload.entities],
        total: action.payload.total
      };
    }
    case actions.SchoolActionType.ADD_SCHOOL_SUCCESS: {
      return {
        ...state,
        school: action.payload
      };
    }
    case actions.SchoolActionType.UPDATE_SCHOOL_SUCCESS: {
      return {
        ...state,
        school: action.payload
      };
    }
    case actions.SchoolActionType.DELETE_SCHOOL_SUCCESS: {
      return {
        ...state
      };
    }
    case actions.SchoolActionType.GET_SCHOOL_BY_ID_SUCCESS: {
      return {
        ...state,
        school: action.payload
      };
    }
    default:
      return state;
  }
}
