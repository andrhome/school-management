import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HelperService } from '@services/helper/helper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-lessons-set',
  templateUrl: './edit-lessons-set.component.html',
  styleUrls: ['./edit-lessons-set.component.scss']
})
export class EditLessonsSetComponent implements OnInit {
  lessonsSetForm: FormGroup;
  isLoading: boolean;

  constructor(public dialogRef: MatDialogRef<EditLessonsSetComponent>,
              @Inject(MAT_DIALOG_DATA) public modalData: any,
              private fb: FormBuilder,
              private helperService: HelperService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    const formConfig = {
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required]
    };
    this.lessonsSetForm = this.fb.group(formConfig);
  }

  public handleDateStart(e): void {
    console.log(this.helperService.prepareRequestDate(e));
  }

  public handleDateEnd(e): void {
    console.log(this.helperService.prepareRequestDate(e));
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public saveLessons(): void {
    this.dialogRef.close();
  }

}
