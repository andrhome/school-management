import * as actions from '@store/actions/subjects.actions';
import { SubjectType } from '@app/types/common.types';

export interface State {
  subjects: SubjectType[];
  subject: SubjectType;
  total: number;
}

export const initialState: State = {
  subjects: [],
  subject: {} as SubjectType,
  total: 0
};

export function reducer(state = initialState, action: actions.SubjectsActions) {
  switch (action.type) {
    case actions.SubjectActionType.GET_SUBJECTS_SUCCESS: {
      return {
        ...state,
        subjects: [...action.payload.entities],
        subject: action.payload.entities[0],
        total: action.payload.total
      };
    }
    case actions.SubjectActionType.UPDATE_SUBJECT_SUCCESS: {
      return {
        ...state,
        subject: action.payload
      };
    }
    case actions.SubjectActionType.DELETE_SUBJECT_SUCCESS: {
      return {
        ...state
      };
    }
    case actions.SubjectActionType.GET_SUBJECT_SUCCESS: {
      return {
        ...state,
        subject: action.payload
      };
    }
    case actions.SubjectActionType.SET_SUBJECT: {
      return {
        ...state,
        subject: action.payload
      };
    }
    default:
      return state;
  }
}
