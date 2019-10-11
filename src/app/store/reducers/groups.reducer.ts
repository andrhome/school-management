import * as actions from '@store/actions/groups.actions';
import { GroupType } from '@app/types/common.types';

export interface State {
  groups: Array<GroupType>;
  group: GroupType;
  total: number;
}

export const initialState: State = {
  groups: [],
  group: {} as GroupType,
  total: 0
};

export function reducer(state = initialState, action: actions.GroupsActions) {
  switch (action.type) {
    case actions.GroupActionType.GET_GROUPS_SUCCESS: {
      return {
        ...state,
        groups: [...action.payload.entities],
        group: state.group.id ? state.group : action.payload.entities[0],
        total: action.payload.total
      };
    }
    case actions.GroupActionType.UPDATE_GROUP_SUCCESS: {
      return {
        ...state,
        group: action.payload
      };
    }
    case actions.GroupActionType.DELETE_GROUP_SUCCESS: {
      return {
        ...state
      };
    }
    case actions.GroupActionType.GET_GROUP_BY_ID_SUCCESS: {
      return {
        ...state,
        group: action.payload
      };
    }
    case actions.GroupActionType.SET_GROUP: {
      return {
        ...state,
        group: action.payload
      };
    }
    default:
      return state;
  }
}
