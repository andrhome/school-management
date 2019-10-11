import * as actions from '@store/actions/subdivisions.actions';
import { SubdivisionType } from '@app/types/common.types';

export interface State {
  subdivisions: Array<SubdivisionType>;
  subdivision: SubdivisionType;
  total: number;
}

export const initialState: State = {
  subdivisions: [],
  subdivision: {} as SubdivisionType,
  total: 0
};

export function reducer(state = initialState, action: actions.SubdivisionsActions) {
  switch (action.type) {
    case actions.SubdivisionActionType.GET_SUBDIVISIONS_SUCCESS: {
      return {
        ...state,
        subdivisions: [...action.payload.entities],
        total: action.payload.total
      };
    }
    case actions.SubdivisionActionType.UPDATE_SUBDIVISION_SUCCESS: {
      return {
        ...state,
        subdivision: action.payload
      };
    }
    case actions.SubdivisionActionType.DELETE_SUBDIVISION_SUCCESS: {
      return {
        ...state
      };
    }
    case actions.SubdivisionActionType.GET_SUBDIVISION_SUCCESS: {
      return {
        ...state,
        subdivision: action.payload
      };
    }
    default:
      return state;
  }
}
