import { Component, OnInit } from '@angular/core';
import { PluralItemsType } from '@app/types/common.enums';

@Component({
  selector: 'sch-add-parent',
  templateUrl: './add-parent.component.html',
  styleUrls: ['./add-parent.component.scss']
})
export class AddParentComponent implements OnInit {
  pluralItemsType = PluralItemsType;

  constructor() { }

  ngOnInit() {
  }

}
