import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mts-handling-list',
  templateUrl: './handling-list.component.html',
  styleUrls: ['./handling-list.component.scss']
})
export class HandlingListComponent implements OnInit {
  subjects = [
    {
      id: 1234,
      title: 'Красно-синие штанги',
      presented: 4,
      inProgress: 2,
    },
    {
      id: 1235,
      title: 'Цифры и чипсы',
      presented: 0,
      inProgress: 2,
    },
    {
      id: 1236,
      title: 'Веретена',
      presented: 999,
      inProgress: 2,
    },
    {
      id: 1237,
      title: 'Математическая шкатулка',
      presented: 0,
      inProgress: 0,
    },
  ];
  activeSubject = this.subjects[0].id;

  constructor() { }

  ngOnInit() {
  }

  setActiveSubject(id): void {
    this.activeSubject = id;
  }
}
