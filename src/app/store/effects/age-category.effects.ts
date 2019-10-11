import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import * as actions from '@store/actions/age-category.actions';
import { catchError, map, mapTo, switchMap } from 'rxjs/operators';
import { AgeCategoryType } from '@app/types/common.types';
import { AgeCategoryService } from '@services/age-category/age-category.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AgeCategoryEffects {
  constructor(private actions$: Actions,
              private ageCategoryService: AgeCategoryService,
              private toastr: ToastrService) {
  }

  @Effect()
  getAgeCategories: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.AgeCategoryActionType.GET_AGECATEGORIES),
    switchMap((action: {[key: string]: any}) => {
      return this.ageCategoryService.getAgeCategories(action.payload).pipe(
        map((ageCategories: {[key: string]: any}) => {
          return new actions.GetAgeCategoriesSuccess(ageCategories);
        }),
        catchError(error => of(new actions.GetAgeCategoriesFailed(error)))
      );
    })
  );

  @Effect()
  addAgeCategory: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.AgeCategoryActionType.ADD_AGECATEGORY),
    switchMap((action: any) => {
      return this.ageCategoryService.addAgeCategory(action.payload).pipe(
        map((ageCategory: AgeCategoryType) => {
          this.toastr.success(`Возрастная категория "${action.payload.name}" была успешно добавлена!`);
          return new actions.AddAgeCategorySuccess(ageCategory);
        }),
        catchError(error => {
          this.toastr.error(`${error.message}`, `Ошибка при добавлении!`);
          return of(new actions.AddAgeCategoryFailed(error));
        })
      );
    })
  );

  @Effect()
  deleteAgeCategory: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.AgeCategoryActionType.DELETE_AGECATEGORY),
    switchMap((action: any) => {
      return this.ageCategoryService.deleteAgeCategory(action.payload.id).pipe(
        map(() => {
          this.toastr.success(`Данные о категории "${action.payload.name}" были успешно удалены!`);
          return new actions.DeleteAgeCategorySuccess(action.payload.id);
        }),
        catchError(error => {
          this.toastr.error(`${error.message}`, `Ошибка при удалении!`);
          return of(new actions.DeleteAgeCategoryFailed(error));
        })
      );
    })
  );

  @Effect()
  updateAgeCategory: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.AgeCategoryActionType.UPDATE_AGECATEGORY),
    switchMap((action: any) => {
      return this.ageCategoryService.updateAgeCategory(action.payload).pipe(
        map((ageCategory: AgeCategoryType) => {
          this.toastr.success(`Данные о категории ${action.payload.name} были успешно обновлены!`);
          return new actions.UpdateAgeCategorySuccess(ageCategory);
        }),
        catchError(error => {
          this.toastr.error(`${error.message}`, `Ошибка при обновлении!`);
          return of(new actions.UpdateAgeCategoryFailed(error));
        })
      );
    })
  );

  @Effect()
  getAgeCategory: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.AgeCategoryActionType.GET_AGECATEGORY),
    switchMap((action: any) => {
      return this.ageCategoryService.getAgeCategory(action.payload).pipe(
        map((ageCategory: AgeCategoryType) => {
          return new actions.GetAgeCategorySuccess(ageCategory);
        }),
        catchError(error => of(new actions.GetAgeCategoryFailed(error)))
      );
    })
  );
}
