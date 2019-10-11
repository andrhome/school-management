import * as actions from '@store/actions/age-category.actions';
import { AgeCategoryType } from '@app/types/common.types';


export interface State {
  ageCategories: Array<AgeCategoryType>;
  ageCategory: AgeCategoryType;
  total: number;
}

export const initialState: State = {
  ageCategories: [],
  ageCategory: {} as AgeCategoryType,
  total: 0
};

export function reducer(state = initialState, action: actions.AgeCategoriesActions) {
  switch (action.type) {
    case actions.AgeCategoryActionType.GET_AGECATEGORIES_SUCCESS: {
      return {
        ...state,
        ageCategories: [...action.payload.entities],
        ageCategory: action.payload.entities[0],
        total: action.payload.total
      };
    }
    case actions.AgeCategoryActionType.UPDATE_AGECATEGORY_SUCCESS: {
      return {
        ...state,
        ageCategory: action.payload
      };
    }
    case actions.AgeCategoryActionType.DELETE_AGECATEGORY_SUCCESS: {
      return {
        ...state
      };
    }
    case actions.AgeCategoryActionType.GET_AGECATEGORY_SUCCESS: {
      return {
        ...state,
        ageCategory: action.payload
      };
    }
    case actions.AgeCategoryActionType.SET_AGECATEGORY: {
      return {
        ...state,
        ageCategory: action.payload
      };
    }
    default:
      return state;
  }
}
