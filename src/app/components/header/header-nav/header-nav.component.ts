import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ObservationType } from '@app/types/common.enums';

@Component({
  selector: 'mts-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {
  isShowNav: boolean;
  subscription: Subscription;
  observation = ObservationType;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  toggleNav(): void {
    if (!this.isShowNav) {
      this.subscription = this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.isShowNav = false;
          this.subscription.unsubscribe();
        }
      });
    } else {
      this.subscription.unsubscribe();
    }
    this.isShowNav = !this.isShowNav;
  }

}
