import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


export interface ConfirmDialogData {
  message: string;
}

@Component({
  selector: 'sch-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})

export class ConfirmComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) { }

  public onClose(): void {
    this.dialogRef.close();
  }

}
