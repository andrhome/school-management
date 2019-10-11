import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as materialsMapsReducers from '@store/reducers/material-maps.reducer';
import { Store } from '@ngrx/store';
import * as actions from '@store/actions/material-maps.actions';
import { Subject } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AgeCategoryType, MapMaterialsType, SubjectType } from '@app/types/common.types';
import * as ageCategoryReducers from '@store/reducers/age-category.reducer';
import * as subjectsReducers from '@store/reducers/subjects.reducer';
import * as actionsAgeCategory from '@store/actions/age-category.actions';
import * as actionsSubjects from '@store/actions/subjects.actions';
import { PluralItemsType } from '@app/types/common.enums';

@Component({
  selector: 'mts-add-map-materials',
  templateUrl: './add-map-materials.component.html',
  styleUrls: ['./add-map-materials.component.scss']
})
export class AddMapMaterialsComponent implements OnInit, OnDestroy {
  mapForm: FormGroup;
  isLoading: boolean;
  private readonly onDestroy = new Subject<void>();
  updateMode: boolean;
  currentMapId: number;
  ageCategories: AgeCategoryType[];
  subjectsArray: SubjectType[];
  pluralItemsType = PluralItemsType;

  constructor(private fb: FormBuilder,
              private store: Store<materialsMapsReducers.State>,
              private storeAgeCategories: Store<ageCategoryReducers.State>,
              private storeSubjects: Store<subjectsReducers.State>,
              private updates: Actions,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getInitData();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private initForm(): void {
    this.initUpdateMode();
    let formConfig = this.getFormConfigs();
    if (this.updateMode) {
      this.store.dispatch(new actions.GetMaterialMap(this.currentMapId));
      this.store.select(state => state.materialMaps)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((res: { [key: string]: any }) => {
          formConfig = this.getFormConfigs(res.materialMap);
          this.mapForm = this.fb.group(formConfig);
        });
    } else {
      this.mapForm = this.fb.group(formConfig);
    }
  }

  private initUpdateMode(): void {
    this.route.queryParams.pipe(takeUntil(this.onDestroy))
      .subscribe(params => {
        if (params && params.id) {
          this.updateMode = true;
          this.currentMapId = params.id;
        } else {
          this.updateMode = false;
        }
      });
  }

  private getInitData(): void {
    const params = {
      page: 1,
      perPage: 200
    };

    this.store.dispatch(new actionsAgeCategory.GetAgeCategories(params));
    this.storeAgeCategories.select(state => state.ageCategories)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.ageCategories = res.ageCategories;
      });

    this.store.dispatch(new actionsSubjects.GetSubjects(params));
    this.storeSubjects.select(state => state.subjects)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.subjectsArray = res.subjects;
      });
  }

  private getFormConfigs(materialMap: MapMaterialsType = {} as MapMaterialsType): {[key: string]: any} {
    const zonesData = [];

    if (materialMap.zones && materialMap.zones.length) {
      materialMap.zones.forEach(zone => {
        zonesData.push(this.fb.group(this.createZone(zone)));
      });
    }

    return {
      name: [materialMap.name || null, Validators.required],
      ageCategory: [materialMap.ageCategory ? materialMap.ageCategory.id : null, Validators.required],
      zones: this.fb.array(zonesData),
    };
  }

  private createZone(zone: {[key: string]: any} = {}): {[key: string]: any} {
    const subjectsData = [];

    if (zone.subjects && zone.subjects.length) {
      zone.subjects.forEach(subject => {
        subjectsData.push(this.fb.group(this.createSubject(subject)));
      });
    }

    return {
      name: [zone.name || null, Validators.required],
      subjects: this.fb.array(subjectsData)
    };
  }

  private get zonesArray(): FormArray {
    return this.mapForm.get('zones') as FormArray;
  }

  addZone(): void {
    this.zonesArray.push(this.fb.group(this.createZone()));
  }

  removeZone(index: number): void {
    this.zonesArray.removeAt(index);
  }

  private createSubject(subject: {[key: string]: any} = {}): {[key: string]: any} {
    return {
      subject: [subject.subject ? subject.subject.id : null],
      materials: [this.prepareFormMaterials(subject) || null]
    };
  }

  private prepareFormMaterials(subject: {[key: string]: any}): string {
    let materialsStr = '';

    if (subject.materials && subject.materials.length) {
      subject.materials.forEach(item => {
        materialsStr += item.name + ', ';
      });
      materialsStr = materialsStr.slice(0, materialsStr.length - 2);
    }

    return materialsStr;
  }

  addSubject(zone: {[key: string]: any}): void {
    const subjects = zone.get('subjects') as FormArray;
    subjects.push(this.fb.group(this.createSubject()));
  }

  removeSubject(zone: {[key: string]: any}, index: number): void {
    const subjects = zone.get('subjects') as FormArray;
    subjects.removeAt(index);
  }

  private prepareRequestMaterials(materialMap: MapMaterialsType): MapMaterialsType {
    materialMap.zones.forEach(zone => {
      zone.subjects.forEach(subject => {
        const materialsArray = subject.materials.split(', ');
        subject.materials = [];
        materialsArray.forEach(item => {
          subject.materials.push({name: item});
        });
      });
    });

    return materialMap;
  }

  private addMaterialMapHandler(materialMap: MapMaterialsType): void {
    materialMap = this.prepareRequestMaterials(materialMap);
    this.isLoading = true;
    this.store.dispatch(new actions.AddMaterialMap(materialMap));
    this.updates.pipe(ofType(actions.MaterialMapActionType.ADD_MATERIAL_MAP_SUCCESS,
      actions.MaterialMapActionType.ADD_MATERIAL_MAP_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: {[key: string]: any}) => {
        if (res.type === actions.MaterialMapActionType.ADD_MATERIAL_MAP_SUCCESS) {
          this.mapForm.reset();
          this.initForm();
        }
        this.isLoading = false;
      });
  }

  private updateMaterialMapHandler(materialMap: MapMaterialsType): void {
    materialMap = this.prepareRequestMaterials(materialMap);
    this.isLoading = true;
    this.store.dispatch(new actions.UpdateMaterialMap(materialMap));
    this.updates.pipe(ofType(actions.MaterialMapActionType.UPDATE_MATERIAL_MAP_SUCCESS,
      actions.MaterialMapActionType.UPDATE_MATERIAL_MAP_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.isLoading = false);
  }

  submit(): void {
    if (this.mapForm.invalid) {
      return;
    }
    const map = this.mapForm.value;

    if (this.updateMode) {
      map.id = this.currentMapId;
      this.updateMaterialMapHandler(map);
    } else {
      this.addMaterialMapHandler(map);
    }
  }
}
