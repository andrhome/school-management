import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthorizedUser: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuthorizedUser = this.authService.isAuthorized;
  }

}
