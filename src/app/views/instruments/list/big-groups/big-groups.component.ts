import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '@store/actions/groups.actions';
import * as groupsReducers from '@store/reducers/groups.reducer';
import { GroupType } from '@app/types/common.types';
import { Actions, ofType } from '@ngrx/effects';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmComponent } from '@components/modals/confirm/confirm.component';
import { MatDialog } from '@angular/material';
import { UnitItemType } from '@app/types/common.enums';
import { BigGroupDetailsComponent } from '@views/instruments/list/big-groups/big-group-details/big-group-details.component';

@Component({
  selector: 'app-big-groups',
  templateUrl: './big-groups.component.html',
  styleUrls: ['./big-groups.component.scss']
})
export class BigGroupsComponent implements OnInit, OnDestroy {
  groups: Array<GroupType>;
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

  constructor(private store: Store<groupsReducers.State>,
              private updates: Actions,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchGroups(this.queryParams);
    this.deleteGroupHandler();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  fetchGroups(params: {[key: string]: any}): void {
    this.isLoading = true;
    this.store.dispatch(new actions.GetGroups(params));
    this.store.select(state => state.groups)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.groups = res.groups;
        this.queryParams.total = res.total;
      });
    this.updates.pipe(ofType(actions.GroupActionType.GET_GROUPS_SUCCESS,
      actions.GroupActionType.GET_GROUPS_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.isLoading = false);
  }

  deleteGroupHandler(): void {
    this.updates.pipe(ofType(actions.GroupActionType.DELETE_GROUP_SUCCESS,
      actions.GroupActionType.DELETE_GROUP_FAILED))
      .pipe(takeUntil(this.onDestroy)).subscribe(() => this.fetchGroups(this.queryParams));
  }

  deleteGroup(group: GroupType): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: `Вы действительно хотите удалить группу ${group.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.isLoading = true;
        this.store.dispatch(new actions.DeleteGroup(group));
      }
    });
  }

  showGroupDetails(group: GroupType): void {
    this.dialog.open(BigGroupDetailsComponent, {
      data: group
    });
  }

  fetchGroupsHandler(): void {
    const params = {
      ...this.queryParams,
      ...this.searchObj
    };
    this.fetchGroups(params);
  }

  changePage(value: number): void {
    this.queryParams.page = value;
    this.fetchGroupsHandler();
  }

  searchGroupsHandler(value: string): void {
    this.searchObj.query = value;
    this.queryParams.page = 1;
    this.fetchGroupsHandler();
  }

}
