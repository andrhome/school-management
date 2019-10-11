import { Component, Inject, OnInit } from '@angular/core';
import { SchoolType } from '@app/types/common.types';
import { UnitItemType } from '@app/types/common.enums';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'mts-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.scss']
})
export class SchoolDetailsComponent implements OnInit {
  unitItemType = UnitItemType;

  constructor(public dialogRef: MatDialogRef<SchoolDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SchoolType) { }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
