import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewLessonDialogData } from '@app/types/common.types';

@Component({
  selector: 'app-rename-lesson',
  templateUrl: './rename-lesson.component.html',
  styleUrls: ['./rename-lesson.component.scss']
})
export class RenameLessonComponent implements OnInit {
  renameLessonForm: FormGroup;
  isLoading: boolean;
  constructor(public dialogRef: MatDialogRef<RenameLessonComponent>,
              @Inject(MAT_DIALOG_DATA) public data: NewLessonDialogData,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    let formConfig = {
      name: [this.data.title, Validators.required],
    };

    this.renameLessonForm = this.fb.group(formConfig);
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onSave(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.dialogRef.close();
    }, 200);
  }
}
