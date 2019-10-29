import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Subject } from 'rxjs';
import * as materialMapsReducers from '@store/reducers/material-maps.reducer';
import { Store } from '@ngrx/store';
import { MapMaterialsType } from '@app/types/common.types';
import * as actions from '@store/actions/material-maps.actions';
import { takeUntil } from 'rxjs/operators';
import { PluralItemsType, UnitItemType } from '@app/types/common.enums';

@Component({
  selector: 'app-maps-materials',
  templateUrl: './maps-materials.component.html',
  styleUrls: ['./maps-materials.component.scss']
})
export class MapsMaterialsComponent implements OnInit, OnDestroy {
  materialMaps: MapMaterialsType[];
  isLoading: boolean;
  private readonly onDestroy = new Subject<void>();
  queryParams = {
    page: 1,
    perPage: 15,
    total: 0
  };
  searchObj = {
    query: null
  };
  unitItemType = UnitItemType;
  pluralItemsType = PluralItemsType;

  constructor(
    private store: Store<materialMapsReducers.State>,
    private updates: Actions) {
  }

  ngOnInit() {
    this.fetchMapsMaterials(this.queryParams);
    this.deleteMapMaterialHandler();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  fetchMapsMaterials(params: {[key: string]: any}): void {
    this.isLoading = true;
    this.store.dispatch(new actions.GetMaterialMaps(params));
    this.store.select(state => state.materialMaps)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: {[key: string]: any}) => {
        this.materialMaps = res.materialMaps;
        this.queryParams.total = res.total;
      });
    this.updates.pipe(ofType(actions.MaterialMapActionType.GET_MATERIAL_MAPS_SUCCESS,
      actions.MaterialMapActionType.GET_MATERIAL_MAPS_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.isLoading = false);
  }

  deleteMapMaterialHandler(): void {
    this.updates.pipe(ofType(actions.MaterialMapActionType.DELETE_MATERIAL_MAP_SUCCESS,
      actions.MaterialMapActionType.DELETE_MATERIAL_MAP_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.fetchMapsMaterials(this.queryParams));
  }

  fetchMapsMaterialsHandler(): void {
    const params = {
      ...this.queryParams,
      ...this.searchObj
    };
    this.fetchMapsMaterials(params);
  }

  changePage(value: number): void {
    this.queryParams.page = value;
    this.fetchMapsMaterialsHandler();
  }

  searchMapsMaterialsHandler(value: string): void {
    this.searchObj.query = value;
    this.queryParams.page = 1;
    this.fetchMapsMaterialsHandler();
  }
}
