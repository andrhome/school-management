import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserType } from '@app/types/common.types';
import { Subject } from 'rxjs';
import { PluralItemsType, UnitItemType } from '@app/types/common.enums';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as teachersReducers from '@store/reducers/users.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import * as actions from '@store/actions/users.actions';

@Component({
  selector: 'sch-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.scss']
})
export class TeacherDetailsComponent implements OnInit, OnDestroy {
  currentTeacher: UserType;
  currentTeacherId: number;
  private readonly onDestroy = new Subject<void>();
  isLoading: boolean;
  unitItemType = UnitItemType;
  pluralItemsType = PluralItemsType;

  constructor(private route: ActivatedRoute,
              private store: Store<teachersReducers.State>,
              private updates: Actions) { }

  ngOnInit() {
    this.initData();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private initData(): void {
    this.route.params
      .pipe(takeUntil(this.onDestroy))
      .subscribe(params => {
        if (params && params.id) {
          this.currentTeacherId = +params.id;
          this.store.select(state => state.users)
            .pipe(takeUntil(this.onDestroy))
            .subscribe((res: { [key: string]: any }) => {
              if (res.user.id === this.currentTeacherId) {
                this.currentTeacher = res.user;
              } else {
                this.currentTeacher = res.users.find(pupil => pupil.id === this.currentTeacherId);
              }
            });

          if (!(this.currentTeacher && this.currentTeacher.id)) {
            this.fetchTeacherById();
          }

          this.updates.pipe(
            ofType(actions.UserActionType.GET_USER_BY_ID_SUCCESS,
              actions.UserActionType.GET_USER_BY_ID_FAILED),
            takeUntil(this.onDestroy))
            .subscribe(() => this.isLoading = false);
        }
      });
  }

  private fetchTeacherById(): void {
    this.isLoading = true;
    this.store.dispatch(new actions.GetUserById(this.currentTeacherId));
    this.store.select(state => state.users)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((resp: { [key: string]: any }) => {
        this.isLoading = false;
        this.currentTeacher = resp.user;
      });
  }

}
