import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { GroupType } from '@app/types/common.types';
import * as actionsGroup from '@store/actions/groups.actions';
import * as actionsPupils from '@store/actions/pupils.actions';
import * as groupsReducers from '@store/reducers/groups.reducer';
import * as pupilsReducers from '@store/reducers/pupils.reducer';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sch-pupils-groups-filter',
  templateUrl: './pupils-groups-filter.component.html',
  styleUrls: ['./pupils-groups-filter.component.scss']
})
export class PupilsGroupsFilterComponent implements OnInit, OnDestroy {
  defaultGroupId: number;
  groups: GroupType[] = [];
  private readonly onDestroy = new Subject<void>();

  constructor(private storeGroups: Store<groupsReducers.State>,
              private storePupils: Store<pupilsReducers.State>,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.fetchGroups();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private fetchGroups(): void {
    this.storeGroups.select(state => state.groups)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.groups = res.groups;
        this.defaultGroupId = res.group.id;
        this.cdr.markForCheck();
      });
  }

  public onGroupChange(id: number): void {
    const activeGroup = this.groups.find(item => item.id === id);
    this.storePupils.dispatch(new actionsPupils.SetPupil(null));
    this.storeGroups.dispatch(new actionsGroup.SetGroup(activeGroup));
  }

}

