import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mts-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input()groupView: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }
  isLinkActive(url): boolean {
    const queryParamsIndex = this.router.url.indexOf('?');
    const baseUrl = queryParamsIndex === -1 ? this.router.url :
      this.router.url.slice(0, queryParamsIndex);
    return baseUrl === url;
  }

}
