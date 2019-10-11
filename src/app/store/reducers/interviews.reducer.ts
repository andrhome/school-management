import * as actions from '@store/actions/interviews.actions';
import { InterviewType } from '@app/types/common.types';

export interface State {
  interviews: Array<InterviewType>;
  total: number;
  interview: InterviewType;
}

export const initialState: State = {
  interviews: [],
  total: null,
  interview: {} as InterviewType
};

export function reducer(state = initialState, action: actions.InterviewsActions) {
  switch (action.type) {
    case actions.InterviewActionType.GET_INTERVIEWS_SUCCESS: {
      return {
        ...state,
        interviews: [...action.payload.entities],
        interview:  (state.interview && state.interview.id) ? state.interview : action.payload.entities[0],
        total: action.payload.total
      };
    }
    case actions.InterviewActionType.ADD_INTERVIEW_SUCCESS: {
      return {
        ...state,
        interview: action.payload
      };
    }
    case actions.InterviewActionType.UPDATE_INTERVIEW_SUCCESS: {
      return {
        ...state,
        interview: action.payload
      };
    }
    case actions.InterviewActionType.DELETE_INTERVIEW_SUCCESS: {
      return {
        ...state
      };
    }
    case actions.InterviewActionType.GET_INTERVIEW_BY_ID_SUCCESS: {
      return {
        ...state,
        interview: action.payload
      };
    }
    case actions.InterviewActionType.SET_INTERVIEW: {
      return {
        ...state,
        interview: action.payload || {}
      };
    }
    default:
      return state;
  }
}
