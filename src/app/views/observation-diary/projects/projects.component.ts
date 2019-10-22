import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sch-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projectQuantity: string[];
  projectList: string[];

  constructor() { }

  ngOnInit() {
    const projectQuantity = ['3 проекта', '1 проекта', '2 проекта'];
    const projectList = ['3 проекта', '1 проекта', '2 проекта', '2 проекта', '2 проекта'];
    this.projectQuantity = projectQuantity;
    this.projectList = projectList;
  }

}
