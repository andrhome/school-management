import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actionsPupils from '@store/actions/pupils.actions';
import * as pupilReducers from '@store/reducers/pupils.reducer';
import { PupilType } from '@app/types/common.types';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as ageCategoriesReducers from '@store/reducers/age-category.reducer';

@Component({
  selector: 'mts-pupils-nav',
  templateUrl: './pupils-nav.component.html',
  styleUrls: ['./pupils-nav.component.scss']
})
export class PupilsNavComponent implements OnInit, OnDestroy {
  pupilsList: PupilType[];
  pupilSelected: number;
  lastNameStart = true;
  alphabetOrder = 'asc';
  ageOrder = null;
  private readonly onDestroy = new Subject<void>();

  constructor(private storeAgeCategories: Store<ageCategoriesReducers.State>,
              private storePupils: Store<pupilReducers.State>) {
  }

  ngOnInit() {
    this.fetchPupils();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private fetchPupils(): void {
    this.storePupils.select(state => state.pupils)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.pupilSelected = res.pupil ? res.pupil.id : null;
        this.pupilsList = res.pupils;
        if (this.pupilsList.length) {
          this.lastNameStart = true;
          this.handleAlphabetSort(true);
        }
      });

  }

  public handleNameDirection(): void {
    this.lastNameStart = !this.lastNameStart;
    this.handleAlphabetSort(true);
  }

  public handleAlphabetSort(refreshOrder?): void {
    const namesParams = ['firstName', 'lastName'];
    if (this.lastNameStart) {
      namesParams.reverse();
    }

    if (this.alphabetOrder && !refreshOrder) {
      this.alphabetOrder = (this.alphabetOrder === 'asc') ? 'desc' : 'asc';
    } else {
      this.ageOrder = null;
      this.alphabetOrder = 'asc';
    }

    this.sortObjByParams(this.pupilsList, this.alphabetOrder, ...namesParams);
  }

  public handleAgeSort(): void {
    if (this.ageOrder) {
      this.ageOrder = (this.ageOrder === 'asc') ? 'desc' : 'asc';
    } else {
      this.alphabetOrder = null;
      this.ageOrder = 'asc';
    }

    this.sortObjByParams(this.pupilsList, this.ageOrder, 'dob');

  }

  private handlePupilSelect(pupil: PupilType): void {
    this.pupilSelected = pupil.id;
    this.storePupils.dispatch(new actionsPupils.SetPupil(pupil));
  }

  private sortObjByParams(obj, order, param?, param2?): void {
    const sortOrder = order === 'asc' ? 1 : -1;

    obj.sort((a, b) => {
      if (a[param] < b[param]) {
        return -1 * sortOrder;
      } else if (a[param] > b[param]) {
        return sortOrder;
      }

      if (param2) {
        if (a[param2] < b[param2]) {
          return -1 * sortOrder;
        } else if (a[param2] > b[param2]) {
          return sortOrder;
        }
      }
      return 0;
    });
  }

  private returnAge(dob: string): number {
    return new Date().getFullYear() - (+dob.split('-')[0]);
  }
}

