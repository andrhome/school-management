import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SubjectType } from '@app/types/common.types';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as actions from '@store/actions/subjects.actions';
import { MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { ConfirmComponent } from '@components/modals/confirm/confirm.component';
import * as subjectsReducers from '@store/reducers/subjects.reducer';
import { SubjectDetailsComponent } from '@views/instruments/list/subjects/subject-details/subject-details.component';
import { UnitItemType } from '@app/types/common.enums';


@Component({
  selector: 'sch-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit, OnDestroy {
  subjects: SubjectType[];
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

  constructor(
    private store: Store<subjectsReducers.State>,
    private updates: Actions,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchSubjects(this.queryParams);
    this.deleteSubjectHandler();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  fetchSubjects(params: {[key: string]: any}): void {
    this.subjects = [];
    this.isLoading = true;
    this.store.dispatch(new actions.GetSubjects(params));
    this.store.select(state => state.subjects)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: {[key: string]: any}) => {
        this.subjects = res.subjects;
        this.queryParams.total = res.total;
      });
    this.updates.pipe(ofType(actions.SubjectActionType.GET_SUBJECTS_SUCCESS,
      actions.SubjectActionType.GET_SUBJECTS_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.isLoading = false);
  }

  deleteSubjectHandler(): void {
    this.updates.pipe(ofType(actions.SubjectActionType.DELETE_SUBJECT_SUCCESS,
      actions.SubjectActionType.DELETE_SUBJECT_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.fetchSubjects(this.queryParams));
  }

  deleteSubject(subject: SubjectType): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: `Вы действительно хотите удалить предмет ${subject.name} ?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.isLoading = true;
        this.store.dispatch(new actions.DeleteSubject(subject));
      }
    });
  }

  showSubjectDetails(subject: SubjectType): void {
    this.dialog.open(SubjectDetailsComponent, {
      data: subject
    });
  }

  fetchSubjectsHandler(): void {
    const params = {
      ...this.queryParams,
      ...this.searchObj
    };
    this.fetchSubjects(params);
  }

  changePage(value: number): void {
    this.queryParams.page = value;
    this.fetchSubjectsHandler();
  }

  searchSubjectsHandler(value: string): void {
    this.searchObj.query = value;
    this.queryParams.page = 1;
    this.fetchSubjectsHandler();
  }
}
