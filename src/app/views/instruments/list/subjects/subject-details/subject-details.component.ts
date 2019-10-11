import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SubjectType } from '@app/types/common.types';

@Component({
  selector: 'mts-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.scss']
})
export class SubjectDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SubjectDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SubjectType) { }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
