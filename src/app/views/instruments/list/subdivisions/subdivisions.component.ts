import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '@store/actions/subdivisions.actions';
import * as subdivisionsReducers from '@store/reducers/subdivisions.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmComponent } from '@components/modals/confirm/confirm.component';
import { MatDialog } from '@angular/material';
import { SubdivisionType } from '@app/types/common.types';
import { SubdivisionDetailsComponent } from '@views/instruments/list/subdivisions/subdivision-details/subdivision-details.component';
import { UnitItemType } from '@app/types/common.enums';

@Component({
  selector: 'mts-subdivisions',
  templateUrl: './subdivisions.component.html',
  styleUrls: ['./subdivisions.component.scss']
})
export class SubdivisionsComponent implements OnInit, OnDestroy {
  subdivisions: Array<SubdivisionType>;
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

  constructor(private store: Store<subdivisionsReducers.State>,
              private updates: Actions,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchSubdivisions(this.queryParams);
    this.deleteSubdivisionHandler();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  fetchSubdivisions(params: {[key: string]: any}): void {
    this.subdivisions = [];
    this.isLoading = true;
    this.store.dispatch(new actions.GetSubdivisions(params));
    this.store.select(state => state.subdivisions)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.subdivisions = res.subdivisions;
        this.queryParams.total = res.total;
      });
    this.updates.pipe(ofType(actions.SubdivisionActionType.GET_SUBDIVISIONS_SUCCESS,
      actions.SubdivisionActionType.GET_SUBDIVISIONS_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.isLoading = false);
  }

  deleteSubdivisionHandler(): void {
    this.updates.pipe(ofType(actions.SubdivisionActionType.DELETE_SUBDIVISION_SUCCESS,
      actions.SubdivisionActionType.DELETE_SUBDIVISION_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.fetchSubdivisions(this.queryParams));
  }

  deleteSubdivision(subdivision: SubdivisionType): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: `Вы действительно хотите удалить подгруппу ${subdivision.name} ?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.isLoading = true;
        this.store.dispatch(new actions.DeleteSubdivision(subdivision));
      }
    });
  }

  showSubdivisionDetails(subdivision: SubdivisionType): void {
    this.dialog.open(SubdivisionDetailsComponent, {
      data: subdivision
    });
  }

  fetchSubdivisionsHandler(): void {
    const params = {
      ...this.queryParams,
      ...this.searchObj
    };
    this.fetchSubdivisions(params);
  }

  changePage(value: number): void {
    this.queryParams.page = value;
    this.fetchSubdivisionsHandler();
  }

  searchSubdivisionsHandler(value: string): void {
    this.searchObj.query = value;
    this.queryParams.page = 1;
    this.fetchSubdivisionsHandler();
  }

}
