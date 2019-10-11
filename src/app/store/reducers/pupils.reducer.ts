import * as actions from '@store/actions/pupils.actions';
import { PupilType } from '@app/types/common.types';

export interface State {
  pupils: Array<PupilType>;
  total: number;
  pupil: PupilType;
}

export const initialState: State = {
  pupils: [],
  total: null,
  pupil: {} as PupilType
};

export function reducer(state = initialState, action: actions.PupilsActions) {
  switch (action.type) {
    case actions.PupilActionType.GET_PUPILS_SUCCESS: {
      return {
        ...state,
        pupils: [...action.payload.entities],
        pupil:  state.pupil.id ? state.pupil : action.payload.entities[0],
        total: action.payload.total
      };
    }
    case actions.PupilActionType.ADD_PUPIL_SUCCESS: {
      return {
        ...state,
        pupil: action.payload
      };
    }
    case actions.PupilActionType.UPDATE_PUPIL_SUCCESS: {
      return {
        ...state,
        pupil: action.payload
      };
    }
    case actions.PupilActionType.DELETE_PUPIL_SUCCESS: {
      return {
        ...state
      };
    }
    case actions.PupilActionType.GET_PUPIL_BY_ID_SUCCESS: {
      return {
        ...state,
        pupil: action.payload
      };
    }
    case actions.PupilActionType.SET_PUPIL: {
      return {
        ...state,
        pupil: action.payload || {}
      };
    }
    default:
      return state;
  }
}
