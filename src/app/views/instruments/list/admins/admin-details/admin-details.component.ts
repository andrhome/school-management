import { Component, Inject, OnInit } from '@angular/core';
import { UserType } from '@app/types/common.types';
import { UnitItemType } from '@app/types/common.enums';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.scss']
})
export class AdminDetailsComponent implements OnInit {
  unitItemType = UnitItemType;

  constructor(public dialogRef: MatDialogRef<AdminDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserType) { }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
