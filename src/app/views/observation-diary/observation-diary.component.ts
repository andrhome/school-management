import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import * as actionsGroup from '@store/actions/groups.actions';
import * as actionsPupils from '@store/actions/pupils.actions';
import * as actionsTeachers from '@store/actions/users.actions';
import * as groupsReducers from '@store/reducers/groups.reducer';
import * as pupilReducers from '@store/reducers/pupils.reducer';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import * as subjectsReducers from '@store/reducers/subjects.reducer';
import * as teachersReducers from '@store/reducers/users.reducer';
import * as subjectsActions from '@store/actions/subjects.actions';
import { ObservationType, RolesTypes } from '@app/types/common.enums';
import { UserType } from '@app/types/common.types';
import * as authReducers from '@store/reducers/auth.reducer';

@Component({
  selector: 'sch-observation-diary',
  templateUrl: './observation-diary.component.html',
  styleUrls: ['./observation-diary.component.scss']
})
export class ObservationDiaryComponent implements OnInit, OnDestroy {
  groupView: boolean;
  lastGroupId: number;
  private readonly onDestroy = new Subject<void>();
  obsType = ObservationType;
  currentUser: UserType;

  constructor(private route: ActivatedRoute,
              private storeGroups: Store<groupsReducers.State>,
              private storeTeachers: Store<teachersReducers.State>,
              private storeSubjects: Store<subjectsReducers.State>,
              private storePupils: Store<pupilReducers.State>,
              private storeAuth: Store<authReducers.State>) {
  }

  ngOnInit() {
    this.selectMeHandler();
    this.getInitData();
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private selectMeHandler(): void {
    this.storeAuth.select(state => state.me)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.currentUser = res.me;
        this.storeTeachers.dispatch(new actionsTeachers.SetUser(this.currentUser));
      });
  }

  private getInitData(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.onDestroy))
      .subscribe(params => {
        this.groupView = params.get('observationType') === this.obsType.BY_GROUP;
      });

    const defParams = {
      page: 1,
      perPage: 100
    };

    this.storeGroups.dispatch(new actionsGroup.GetGroups(defParams));
    this.storeTeachers.dispatch(new actionsTeachers.GetUsers({...defParams, role: RolesTypes.TEACHER}));

    this.storeGroups.select(state => state.groups)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {

        if (res.groups.length && (res.group.id !== this.lastGroupId)) {
          this.lastGroupId = res.group.id;

          this.storePupils.dispatch(new actionsPupils.GetPupils(
            {...defParams, group: this.lastGroupId}
            ));

          this.storeSubjects.dispatch(new subjectsActions.GetSubjects(
            {...defParams, ageCategory: res.group.ageCategory.id as number}
            ));
        }
      });
  }
}
