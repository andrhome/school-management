import * as actions from '@store/actions/lessons.actions';
import { LessonType } from '@app/types/common.types';

export interface State {
  lessons: Array<LessonType>;
  lesson: LessonType;
  total: number;
}

export const initialState: State = {
  lessons: [],
  lesson: {} as LessonType,
  total: 0
};

export function reducer(state = initialState, action: actions.LessonsActions) {
  switch (action.type) {
    case actions.LessonsActionType.GET_LESSONS_SUCCESS: {
      return {
        ...state,
        lessons: [...action.payload.entities],
        lesson: action.payload.entities[0],
        total: action.payload.total
      };
    }
    case actions.LessonsActionType.UPDATE_ONE_LESSON_SUCCESS: {
      return {
        ...state,
        lesson: action.payload
      };
    }
    case actions.LessonsActionType.UPDATE_LESSONS_SUCCESS: {
      return {
        ...state,
        lesson: action.payload
      };
    }
    case actions.LessonsActionType.DELETE_ONE_LESSON_SUCCESS: {
      return {
        ...state
      };
    }
    case actions.LessonsActionType.DELETE_LESSONS_SUCCESS: {
      return {
        ...state
      };
    }
    case actions.LessonsActionType.GET_LESSON_BY_ID_SUCCESS: {
      return {
        ...state,
        lesson: action.payload
      };
    }
    default:
      return state;
  }
}
