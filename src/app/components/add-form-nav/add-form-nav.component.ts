import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sch-add-form-nav',
  templateUrl: './add-form-nav.component.html',
  styleUrls: ['./add-form-nav.component.scss']
})
export class AddFormNavComponent implements OnInit {
  @Input() title: string;
  @Input() link: string;

  constructor() { }

  ngOnInit() {
  }

}
