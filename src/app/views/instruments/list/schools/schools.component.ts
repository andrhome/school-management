import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '@store/actions/schools.actions';
import * as schoolsReducers from '@store/reducers/schools.reducer';
import { SchoolType, UserType } from '@app/types/common.types';
import { Actions, ofType } from '@ngrx/effects';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmComponent } from '@components/modals/confirm/confirm.component';
import { MatDialog } from '@angular/material';
import { UnitItemType } from '@app/types/common.enums';
import { SchoolDetailsComponent } from '@views/instruments/list/schools/school-details/school-details.component';

@Component({
  selector: 'mts-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit, OnDestroy {
  schools: Array<SchoolType>;
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

  constructor(private store: Store<schoolsReducers.State>,
              private updates: Actions,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchSchools(this.queryParams);
    this.deleteSchoolsHandler();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  fetchSchools(params: {[key: string]: any}): void {
    this.isLoading = true;
    this.store.dispatch(new actions.GetSchools(params));
    this.store.select(state => state.schools)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.schools = res.schools;
        this.queryParams.total = res.total;
      });
    this.updates.pipe(ofType(actions.SchoolActionType.GET_SCHOOLS_SUCCESS,
      actions.SchoolActionType.GET_SCHOOLS_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.isLoading = false);
  }

  deleteSchoolsHandler(): void {
    this.updates.pipe(ofType(actions.SchoolActionType.DELETE_SCHOOL_SUCCESS,
      actions.SchoolActionType.DELETE_SCHOOL_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.fetchSchools(this.queryParams));
  }

  deleteSchool(e: SchoolType): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: `Вы действительно хотите удалить школу ${e.name} ?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.isLoading = true;
        this.store.dispatch(new actions.DeleteSchool(e));
      }
    });
  }

  showSchoolDetails(school: SchoolType): void {
    this.dialog.open(SchoolDetailsComponent, {
      data: school
    });
  }

  fetchSchoolsHandler(): void {
    const params = {
      ...this.queryParams,
      ...this.searchObj
    };
    this.fetchSchools(params);
  }

  changePage(value: number): void {
    this.queryParams.page = value;
    this.fetchSchoolsHandler();
  }

  searchSchoolsHandler(value: string): void {
    this.searchObj.query = value;
    this.queryParams.page = 1;
    this.fetchSchoolsHandler();
  }

}
