import * as actions from '@store/actions/notes-learner.actions';
import { NoteLearnerType } from '@app/types/common.types';

export interface State {
  notesLearner: NoteLearnerType[];
  noteLearner: NoteLearnerType;
  total: number;
}

export const initialState: State = {
  notesLearner: [],
  noteLearner: {} as NoteLearnerType,
  total: null
};

export function reducer(state = initialState, action: actions.NotesLearnerActions) {
  switch (action.type) {
    case actions.NoteLearnerActionType.GET_NOTES_LEARNER_SUCCESS: {
      return {
        ...state,
        notesLearner: [...action.payload.entities],
        noteLearner:  action.payload.entities[0],
        total: action.payload.total
      };
    }
    case actions.NoteLearnerActionType.ADD_NOTE_LEARNER_SUCCESS: {
      return {
        ...state,
        noteLearner: action.payload
      };
    }
    case actions.NoteLearnerActionType.UPDATE_NOTE_LEARNER_SUCCESS: {
      return {
        ...state,
        noteLearner: action.payload
      };
    }
    case actions.NoteLearnerActionType.DELETE_NOTE_LEARNER_SUCCESS: {
      return {
        ...state
      };
    }
    case actions.NoteLearnerActionType.GET_NOTE_LEARNER_BY_ID_SUCCESS: {
      return {
        ...state,
        noteLearner: action.payload
      };
    }
    case actions.NoteLearnerActionType.SELECT_NOTE_LEARNER: {
      return {
        ...state,
        noteLearner: action.payload
      };
    }
    default:
      return state;
  }
}
