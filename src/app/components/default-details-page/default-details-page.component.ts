import { Component, Input, OnInit } from '@angular/core';
import { UnitItemType } from '@app/types/common.enums';

@Component({
  selector: 'sch-default-details-page',
  templateUrl: './default-details-page.component.html',
  styleUrls: ['./default-details-page.component.scss']
})
export class DefaultDetailsPageComponent implements OnInit {
  @Input() currentItem: {[key: string]: any};
  @Input() editUrl: string;
  unitItemType = UnitItemType;

  constructor() { }

  ngOnInit() {
  }

}
