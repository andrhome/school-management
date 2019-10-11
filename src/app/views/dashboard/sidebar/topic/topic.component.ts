import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgeCategoryType } from '@app/types/common.types';
import { Store } from '@ngrx/store';
import * as ageCategoriesReducers from '@store/reducers/age-category.reducer';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from '@services/helper/helper.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'mts-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})

export class TopicComponent implements OnInit, OnDestroy {
  newTopicForm: FormGroup;
  isLoading: boolean;
  ageCategories: AgeCategoryType[];
  startDateObj: Date;
  endDateObj: Date;
  private readonly onDestroy = new Subject<void>();

  constructor(private fb: FormBuilder,
              private storeAgeCategories: Store<ageCategoriesReducers.State>,
              private toastr: ToastrService,
              private helperService: HelperService) {
  }

  ngOnInit() {
    this.initForm();
    this.getAgeCategories();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private getAgeCategories(): void {
    this.isLoading = true;
    this.storeAgeCategories
      .select(state => state.ageCategories)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.ageCategories = res.ageCategories;
        this.isLoading = false;
      });
  }

  private initForm(): void {
    const formConfig = {
      name: [null, Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      ageCategories: [null, Validators.required],
    };
    this.newTopicForm = this.fb.group(formConfig);
  }

  public changeStartDate(e): void {
    this.startDateObj = e;
    this.newTopicForm.controls['startDate'].setValue(this.helperService.prepareRequestDate(e));
  }

  public changeEndDate(e): void {
    this.endDateObj = e;
    this.newTopicForm.controls['endDate'].setValue(this.helperService.prepareRequestDate(e));
  }

  public onSave(): void | boolean {

    if (!this.validateRange(this.startDateObj, this.endDateObj)) {
      return false;
    }

    this.isLoading = true;
    setTimeout(() => {
      this.toastr.success(`Тема сохранена успешно!`);
      this.isLoading = false;
      console.log('SAVED', this.newTopicForm.value);
      this.resetForm();
    }, 1000);
  }

  private validateRange(min, max): boolean {
    if (min > max) {
      this.toastr.error(`Указан некорректный диапазон дат`);
      return false;
    }
    return true;
  }

  private resetForm(): void {
    this.newTopicForm.controls['name'].reset();
    this.newTopicForm.controls['ageCategories'].reset();
  }
}
