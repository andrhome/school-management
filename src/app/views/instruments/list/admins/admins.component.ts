import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Subject } from 'rxjs';
import { ConfirmComponent } from '@components/modals/confirm/confirm.component';
import { MatDialog } from '@angular/material';
import * as usersReducers from '@store/reducers/users.reducer';
import { Store } from '@ngrx/store';
import { UserType } from '@app/types/common.types';
import * as actions from '@store/actions/users.actions';
import { takeUntil } from 'rxjs/operators';
import { RolesTypes, UnitItemType } from '@app/types/common.enums';
import { AdminDetailsComponent } from '@views/instruments/list/admins/admin-details/admin-details.component';

@Component({
  selector: 'mts-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit, OnDestroy {
  adminsList: UserType[];
  isLoading: boolean;
  private readonly onDestroy = new Subject<void>();
  queryParams = {
    role: RolesTypes.ADMIN,
    page: 1,
    perPage: 15,
    total: 0
  };
  searchObj = {
    query: null
  };
  unitItemType = UnitItemType;

  constructor(
    private store: Store<usersReducers.State>,
    private updates: Actions,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchAdmins(this.queryParams);
    this.deleteAdminHandler();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  fetchAdmins(params: {[key: string]: any}): void {
    this.isLoading = true;
    this.store.dispatch(new actions.GetUsers(params));
    this.store.select(state => state.users)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: {[key: string]: any}) => {
        this.adminsList = res.users;
        this.queryParams.total = res.total;
      });
    this.updates.pipe(ofType(actions.UserActionType.GET_USERS_SUCCESS,
      actions.UserActionType.GET_USERS_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.isLoading = false);
  }

  deleteAdminHandler(): void {
    this.updates.pipe(ofType(actions.UserActionType.DELETE_USER_SUCCESS,
      actions.UserActionType.DELETE_USER_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.fetchAdmins(this.queryParams));
  }

  deleteAdmin(admin: UserType): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: `Вы действительно хотите удалить пользователя "${admin.firstName} ${admin.lastName}" ?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.isLoading = true;
        this.store.dispatch(new actions.DeleteUser(admin));
      }
    });
  }

  showAdminDetails(admin: UserType): void {
    this.dialog.open(AdminDetailsComponent, {
      data: admin
    });
  }

  fetchAdminsHandler(): void {
    const params = {
      ...this.queryParams,
      ...this.searchObj
    };
    this.fetchAdmins(params);
  }

  changePage(value: number): void {
    this.queryParams.page = value;
    this.fetchAdminsHandler();
  }

  searchAdminsHandler(value: string): void {
    this.searchObj.query = value;
    this.queryParams.page = 1;
    this.fetchAdminsHandler();
  }

}
