import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '@store/actions/users.actions';
import * as teachersReducers from '@store/reducers/users.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmComponent } from '@components/modals/confirm/confirm.component';
import { MatDialog } from '@angular/material';
import { UserType } from '@app/types/common.types';
import { RolesTypes, UnitItemType } from '@app/types/common.enums';

@Component({
  selector: 'sch-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit, OnDestroy {
  teachers: Array<UserType>;
  isLoading: boolean;
  private readonly onDestroy = new Subject<void>();
  queryParams = {
    role: RolesTypes.TEACHER,
    page: 1,
    perPage: 4,
    total: 0
  };
  searchObj = {
    query: null
  };
  rolesTypes = RolesTypes;
  unitItemType = UnitItemType;

  constructor(private store: Store<teachersReducers.State>,
              private updates: Actions,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchTeachers(this.queryParams);
    this.deleteTeacherHandler();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  fetchTeachers(params: {[key: string]: any}): void {
    this.teachers = [];
    this.isLoading = true;
    this.store.dispatch(new actions.GetUsers(params));
    this.store.select(state => state.users)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.teachers = res.users;
        this.queryParams.total = res.total;
      });
    this.updates.pipe(ofType(actions.UserActionType.GET_USERS_SUCCESS,
      actions.UserActionType.GET_USERS_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.isLoading = false);
  }

  deleteTeacherHandler(): void {
    this.updates.pipe(ofType(actions.UserActionType.DELETE_USER_SUCCESS,
      actions.UserActionType.DELETE_USER_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.fetchTeachers(this.queryParams));
  }

  deleteTeacher(e: UserType): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: `Вы действительно хотите удалить информацию о учителе ${e.firstName} ${e.lastName} ?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.isLoading = true;
        this.store.dispatch(new actions.DeleteUser(e));
      }
    });
  }

  fetchTeachersHandler(): void {
    const params = {
      ...this.queryParams,
      ...this.searchObj
    };
    this.fetchTeachers(params);
  }

  changePage(value: number): void {
    this.queryParams.page = value;
    this.fetchTeachersHandler();
  }

  searchTeachersHandler(value: string): void {
    this.searchObj.query = value;
    this.queryParams.page = 1;
    this.fetchTeachersHandler();
  }

}
