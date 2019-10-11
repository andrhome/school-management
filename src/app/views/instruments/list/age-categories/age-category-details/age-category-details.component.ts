import { Component, Inject, OnInit } from '@angular/core';
import { UnitItemType } from '@app/types/common.enums';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AgeCategoryType } from '@app/types/common.types';

@Component({
  selector: 'mts-age-category-details',
  templateUrl: './age-category-details.component.html',
  styleUrls: ['./age-category-details.component.scss']
})
export class AgeCategoryDetailsComponent implements OnInit {
  unitItemType = UnitItemType;

  constructor(public dialogRef: MatDialogRef<AgeCategoryDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AgeCategoryType) { }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
