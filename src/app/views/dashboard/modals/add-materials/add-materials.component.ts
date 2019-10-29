import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewLessonDialogData } from '@app/types/common.types';

@Component({
  selector: 'app-add-materials',
  templateUrl: './add-materials.component.html',
  styleUrls: ['./add-materials.component.scss']
})
export class AddMaterialsComponent implements OnInit {
  addMaterialsForm: FormGroup;
  isLoading: boolean;
  constructor(public dialogRef: MatDialogRef<AddMaterialsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: NewLessonDialogData,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    let formConfig = {
      name: [null, Validators.required],
    };
    this.addMaterialsForm = this.fb.group(formConfig);
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
