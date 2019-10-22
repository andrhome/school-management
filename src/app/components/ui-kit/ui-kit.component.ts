import { Component, OnInit } from '@angular/core';
import { HelperService } from '@services/helper/helper.service';

@Component({
  selector: 'sch-ui-kit',
  templateUrl: './ui-kit.component.html',
  styleUrls: ['./ui-kit.component.scss']
})
export class UiKitComponent implements OnInit {

  ageCategories = [
    {id: 1, name: 'Option - 1'},
    {id: 2, name: 'Option - 2'},
    {id: 3, name: 'Option - 3'},
    {id: 4, name: 'Option - 4'},
  ];
  testDate = new Date('2017, 5, 5');
  testUser = {
    firstName: 'Ivan',
    lastName: 'Ivanov',
  }

  constructor(private helperService: HelperService) { }

  ngOnInit() {
  }

  public handleDateStart(e): void {
    this.helperService.prepareRequestDate(e);
    console.log(this.helperService.prepareRequestDate(e));
  }

  public handleDateEnd(e): void {
    this.helperService.prepareRequestDate(e);
    console.log(this.helperService.prepareRequestDate(e));
  }
}
