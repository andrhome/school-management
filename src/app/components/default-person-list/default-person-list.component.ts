import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PupilType } from '@app/types/common.types';
import { Router } from '@angular/router';
import * as pupilsActions from '@store/actions/pupils.actions';
import * as pupilsReducers from '@store/reducers/pupils.reducer';
import { Store } from '@ngrx/store';
import * as actionsGroup from '@store/actions/groups.actions';
import * as groupsReducers from '@store/reducers/groups.reducer';
import { ObservationType } from '@app/types/common.enums';

@Component({
  selector: 'sch-default-person-list',
  templateUrl: './default-person-list.component.html',
  styleUrls: ['./default-person-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultPersonListComponent implements OnInit {
  @Output() deleteItem = new EventEmitter<any>();
  @Output() editItem = new EventEmitter<any>();
  @Input() isPupil: boolean;
  @Input() itemsList = [];
  @Input() pageName: string;
  @Input() paginationParams: { [key: string]: any } = {
    page: 1,
    perPage: 20,
    total: 0
  };
  obsType = ObservationType;

  constructor(private router: Router,
              private pupilsStore: Store<pupilsReducers.State>,
              private storeGroups: Store<groupsReducers.State>,
              ) {
  }

  ngOnInit() {
  }

  delete(item): void {
    this.deleteItem.emit(item);
  }

  goToObservationDiary(pupil: PupilType, rout: string): void {
    this.pupilsStore.dispatch(new pupilsActions.SetPupil(pupil));
    this.storeGroups.dispatch(new actionsGroup.SetGroup(pupil.group));

    this.router.navigate([`observation/${rout}`],
      {
        queryParams: {
          observationType: this.obsType.BY_PUPIL,
          page: rout,
        }
      });
  }

}
