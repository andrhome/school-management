import { Component, OnInit } from '@angular/core';
import { PluralItemsType } from '@app/types/common.enums';

@Component({
  selector: 'app-add-academic-discipline',
  templateUrl: './add-academic-discipline.component.html',
  styleUrls: ['./add-academic-discipline.component.scss']
})
export class AddAcademicDisciplineComponent implements OnInit {
  pluralItemsType = PluralItemsType;

  constructor() { }

  ngOnInit() {
  }

}
