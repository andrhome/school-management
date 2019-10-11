import * as actions from '@store/actions/material-maps.actions';
import { MapMaterialsType } from '@app/types/common.types';

export interface State {
  materialMaps: MapMaterialsType[];
  materialMap: MapMaterialsType;
  total: number;
}

export const initialState: State = {
  materialMaps: [],
  materialMap: {} as MapMaterialsType,
  total: 0
};

export function reducer(state = initialState, action: actions.MaterialMapsActions) {
  switch (action.type) {
    case actions.MaterialMapActionType.GET_MATERIAL_MAPS_SUCCESS: {
      return {
        ...state,
        materialMaps: [...action.payload.entities],
        total: action.payload.total
      };
    }
    case actions.MaterialMapActionType.UPDATE_MATERIAL_MAP_SUCCESS: {
      return {
        ...state,
        materialMap: action.payload
      };
    }
    case actions.MaterialMapActionType.DELETE_MATERIAL_MAP_SUCCESS: {
      return {
        ...state
      };
    }
    case actions.MaterialMapActionType.GET_MATERIAL_MAP_SUCCESS: {
      return {
        ...state,
        materialMap: action.payload
      };
    }
    default:
      return state;
  }
}
