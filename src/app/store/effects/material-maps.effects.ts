import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import * as actions from '@store/actions/material-maps.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MapMaterialsType } from '@app/types/common.types';
import { ToastrService } from 'ngx-toastr';
import { MaterialMapsService } from '@services/material-maps/material-maps.service';

@Injectable()
export class MaterialMapsEffects {
  constructor(private actions$: Actions,
              private service: MaterialMapsService,
              private toastr: ToastrService) {
  }

  @Effect()
  getMaterialMaps: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.MaterialMapActionType.GET_MATERIAL_MAPS),
    switchMap((action: {[key: string]: any}) => {
      return this.service.getMaterialMaps(action.payload).pipe(
        map((materialMaps: {[key: string]: any}) => {
          return new actions.GetMaterialMapsSuccess(materialMaps);
        }),
        catchError(error => of(new actions.GetMaterialMapsFailed(error)))
      );
    })
  );

  @Effect()
  addMaterialMap: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.MaterialMapActionType.ADD_MATERIAL_MAP),
    switchMap((action: any) => {
      return this.service.addMaterialMap(action.payload).pipe(
        map((materialMap: MapMaterialsType) => {
          this.toastr.success(`Карта материалов "${action.payload.name}" была успешно добавлена!`);
          return new actions.AddMaterialMapSuccess(materialMap);
        }),
        catchError(error => {
          this.toastr.error(`${error.message}`, `Ошибка при добавлении!`);
          return of(new actions.AddMaterialMapFailed(error));
        })
      );
    })
  );

  @Effect()
  deleteMaterialMap: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.MaterialMapActionType.DELETE_MATERIAL_MAP),
    switchMap((action: any) => {
      return this.service.deleteMaterialMap(action.payload.id).pipe(
        map(() => {
          this.toastr.success(`Данные о карте материалов  "${action.payload.name}" были успешно удалены!`);
          return new actions.DeleteMaterialMapSuccess(action.payload.id);
        }),
        catchError(error => {
          this.toastr.error(`${error.message}`, `Ошибка при удалении!`);
          return of(new actions.DeleteMaterialMapFailed(error));
        })
      );
    })
  );

  @Effect()
  updateMaterialMap: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.MaterialMapActionType.UPDATE_MATERIAL_MAP),
    switchMap((action: any) => {
      return this.service.updateMaterialMap(action.payload).pipe(
        map((materialMap: MapMaterialsType) => {
          this.toastr.success(`Данные о карте материалов "${action.payload.name}" были успешно обновлены!`);
          return new actions.UpdateMaterialMapSuccess(materialMap);
        }),
        catchError(error => {
          this.toastr.error(`${error.message}`, `Ошибка при обновлении!`);
          return of(new actions.UpdateMaterialMapFailed(error));
        })
      );
    })
  );

  @Effect()
  getMaterialMap: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.MaterialMapActionType.GET_MATERIAL_MAP),
    switchMap((action: any) => {
      return this.service.getMaterialMap(action.payload).pipe(
        map((materialMap: MapMaterialsType) => {
          return new actions.GetMaterialMapSuccess(materialMap);
        }),
        catchError(error => of(new actions.GetMaterialMapFailed(error)))
      );
    })
  );
}
