import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actionsSchool from '@store/actions/schools.actions';
import * as actions from '@store/actions/subdivisions.actions';
import * as subdivisionsReducers from '@store/reducers/subdivisions.reducer';
import * as schoolsReducers from '@store/reducers/schools.reducer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { SchoolType, SubdivisionType } from '@app/types/common.types';
import { PluralItemsType } from '@app/types/common.enums';

@Component({
  selector: 'app-add-subdivision',
  templateUrl: './add-subdivision.component.html',
  styleUrls: ['./add-subdivision.component.scss']
})
export class AddSubdivisionComponent implements OnInit, OnDestroy {
  subdivisionForm: FormGroup;
  subscription: Subscription;
  isLoading: boolean;
  private readonly onDestroy = new Subject<void>();
  updateMode: boolean;
  currentSubdivisionId: number;
  schools: Array<SchoolType>;
  pluralItemsType = PluralItemsType;

  constructor(private fb: FormBuilder,
              private store: Store<subdivisionsReducers.State>,
              private storeSchools: Store<schoolsReducers.State>,
              private updates: Actions,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getSchools();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.subscription.unsubscribe();
  }

  private getSchools(): void {
    const params = {
      page: 1,
      perPage: 100
    };
    this.store.dispatch(new actionsSchool.GetSchools(params));
    this.storeSchools.select(state => state.schools).subscribe((res: { [key: string]: any }) => {
      this.schools = res.schools;
    });
  }

  private initForm(): void {
    this.initUpdateMode();
    let formConfig = this.getFormConfigs();
    if (this.updateMode) {
      this.updateMode = true;
      this.store.dispatch(new actions.GetSubdivision(this.currentSubdivisionId));
      this.store.select(state => state.subdivisions)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((res: { [key: string]: any }) => {
          formConfig = this.getFormConfigs(res.subdivision);
          this.subdivisionForm = this.fb.group(formConfig);
        });
    } else {
      this.subdivisionForm = this.fb.group(formConfig);
    }
  }

  private initUpdateMode(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.updateMode = true;
        this.currentSubdivisionId = params.id;
      } else {
        this.updateMode = false;
      }
    });
  }

  private getFormConfigs(subdivision: SubdivisionType = {} as SubdivisionType): {[key: string]: any} {
    return {
      name: [subdivision.name || null, Validators.required],
      school: [subdivision.school || null, Validators.required]
    };
  }

  private addSubdivisionHandler(subdivision: SubdivisionType): void {
    this.isLoading = true;
    this.store.dispatch(new actions.AddSubdivision(subdivision));
    this.updates.pipe(ofType(actions.SubdivisionActionType.ADD_SUBDIVISION_SUCCESS,
      actions.SubdivisionActionType.ADD_SUBDIVISION_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: {[key: string]: any}) => {
        if (res.type === actions.SubdivisionActionType.ADD_SUBDIVISION_SUCCESS) {
          this.subdivisionForm.reset();
        }
        this.isLoading = false;
      });
  }

  private updateSubdivisionHandler(subdivision: SubdivisionType): void {
    this.isLoading = true;
    this.store.dispatch(new actions.UpdateSubdivision(subdivision));
    this.updates.pipe(ofType(actions.SubdivisionActionType.UPDATE_SUBDIVISION_SUCCESS,
      actions.SubdivisionActionType.UPDATE_SUBDIVISION_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.isLoading = false);
  }

  submit(): void {
    if (this.subdivisionForm.invalid) {
      return;
    }
    const subdivision = this.subdivisionForm.value;

    if (this.updateMode) {
      subdivision.id = this.currentSubdivisionId;
      this.updateSubdivisionHandler(subdivision);
    } else {
      this.addSubdivisionHandler(subdivision);
    }
  }

}
