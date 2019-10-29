import { Component, Inject, OnInit } from '@angular/core';
import { UnitItemType } from '@app/types/common.enums';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GroupType } from '@app/types/common.types';

@Component({
  selector: 'app-big-group-details',
  templateUrl: './big-group-details.component.html',
  styleUrls: ['./big-group-details.component.scss']
})
export class BigGroupDetailsComponent implements OnInit {
  unitItemType = UnitItemType;

  constructor(public dialogRef: MatDialogRef<BigGroupDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GroupType) { }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
