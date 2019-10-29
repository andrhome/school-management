import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '@store/actions/pupils.actions';
import * as pupilsReducers from '@store/reducers/pupils.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmComponent } from '@components/modals/confirm/confirm.component';
import { MatDialog } from '@angular/material';
import { PupilType } from '@app/types/common.types';
import { UnitItemType } from '@app/types/common.enums';

@Component({
  selector: 'app-pupils',
  templateUrl: './pupils.component.html',
  styleUrls: ['./pupils.component.scss']
})
export class PupilsComponent implements OnInit, OnDestroy {
  pupils: Array<PupilType>;
  isLoading: boolean;
  private readonly onDestroy = new Subject<void>();
  queryParams = {
    page: 1,
    perPage: 12,
    total: 0
  };
  searchObj = {
    query: null,
    active: null
  };
  unitItemType = UnitItemType;

  constructor(private store: Store<pupilsReducers.State>,
              private updates: Actions,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchPupils(this.queryParams);
    this.getPupilsHandler();
    this.deletePupilHandler();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  fetchPupils(params: {[key: string]: any}): void {
    this.pupils = [];
    this.isLoading = true;
    this.store.dispatch(new actions.GetPupils(params));
    this.store.select(state => state.pupils)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.pupils = res.pupils;
        this.queryParams.total = res.total;
      });
  }

  private getPupilsHandler(): void {
    this.updates.pipe(ofType(actions.PupilActionType.GET_PUPILS_SUCCESS,
      actions.PupilActionType.GET_PUPILS_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.isLoading = false);
  }

  private deletePupilHandler(): void {
    this.updates.pipe(ofType(actions.PupilActionType.DELETE_PUPIL_SUCCESS,
      actions.PupilActionType.DELETE_PUPIL_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.fetchPupils(this.queryParams));
  }

  deletePupil(pupil: PupilType): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: `Вы действительно хотите удалить информацию о ученике ${pupil.firstName} ${pupil.lastName} ?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.isLoading = true;
        this.store.dispatch(new actions.DeletePupil(pupil));
      }
    });
  }

  changePage(value: number): void {
    this.queryParams.page = value;
    const params = {
      ...this.queryParams,
      ...this.searchObj
    };
    this.fetchPupils(params);
  }

  searchPupilsHandler(value: string): void {
    this.searchObj.query = value;
  }

  setActivity(value: boolean): void {
    this.searchObj.active = value;
  }

  search(): void {
    this.queryParams.page = 1;
    const params = {
      ...this.queryParams,
      ...this.searchObj
    };
    this.fetchPupils(params);
  }

}
