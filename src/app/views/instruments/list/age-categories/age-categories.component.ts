import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { AgeCategoryType } from '@app/types/common.types';
import { Subject } from 'rxjs';
import * as ageCategoriesReducers from '@store/reducers/age-category.reducer';
import * as actions from '@store/actions/age-category.actions';
import { takeUntil } from 'rxjs/operators';
import { ConfirmComponent } from '@components/modals/confirm/confirm.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { AgeCategoryDetailsComponent } from '@views/instruments/list/age-categories/age-category-details/age-category-details.component';
import { UnitItemType } from '@app/types/common.enums';

@Component({
  selector: 'sch-age-categories',
  templateUrl: './age-categories.component.html',
  styleUrls: ['./age-categories.component.scss']
})
export class AgeCategoriesComponent implements OnInit, OnDestroy {
  ageCategories: Array<AgeCategoryType>;
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

  constructor(private store: Store<ageCategoriesReducers.State>,
              public dialog: MatDialog,
              private toastr: ToastrService,
              private updates: Actions) {
  }

  ngOnInit() {
    this.fetchCategories(this.queryParams);
    this.deleteCategoryHandler();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  fetchCategories(params: {[key: string]: any}): void {
    this.isLoading = true;
    this.store.dispatch(new actions.GetAgeCategories(params));
    this.store.select(state => state.ageCategories)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.ageCategories = res.ageCategories;
        this.queryParams.total = res.total;
      });
    this.updates.pipe(ofType(actions.AgeCategoryActionType.GET_AGECATEGORIES_FAILED,
      actions.AgeCategoryActionType.GET_AGECATEGORIES_SUCCESS))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.isLoading = false);
  }

  deleteCategoryHandler(): void {
    this.updates.pipe(ofType(actions.AgeCategoryActionType.DELETE_AGECATEGORY_FAILED,
      actions.AgeCategoryActionType.DELETE_AGECATEGORY_SUCCESS))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.fetchCategories(this.queryParams));
  }

  deleteCategory(item: AgeCategoryType): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: `Вы действительно хотите удалить категорию ${item.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.isLoading = true;
        this.store.dispatch(new actions.DeleteAgeCategory(item));
      }
    });
  }

  showCategoryDetails(category: AgeCategoryType): void {
    this.dialog.open(AgeCategoryDetailsComponent, {
      data: category
    });
  }

  fetchCategoriesHandler(): void {
    const params = {
      ...this.queryParams,
      ...this.searchObj
    };
    this.fetchCategories(params);
  }

  changePage(value: number): void {
    this.queryParams.page = value;
    this.fetchCategoriesHandler();
  }

  searchCategoriesHandler(value: string): void {
    this.searchObj.query = value;
    this.queryParams.page = 1;
    this.fetchCategoriesHandler();
  }
}
