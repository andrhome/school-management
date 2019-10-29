import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SubdivisionType } from '@app/types/common.types';

@Component({
  selector: 'app-subdivision-details',
  templateUrl: './subdivision-details.component.html',
  styleUrls: ['./subdivision-details.component.scss']
})
export class SubdivisionDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SubdivisionDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SubdivisionType) { }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
