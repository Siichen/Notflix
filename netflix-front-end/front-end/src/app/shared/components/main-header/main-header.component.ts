import { Component, model, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { TmbdService } from '../../../services/tmbd/tmbd.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  isLogin!: boolean;
  username = '';

  constructor(
    private readonly authService: AuthService,
    private readonly tmdbService: TmbdService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.userSubject.getValue();
    console.log('Current User:', currentUser);
    if (currentUser && currentUser.jwtToken && currentUser.username) {
      this.isLogin = true;
      this.username = currentUser.username;
    } else {
      this.isLogin = false;
    }
  }

  signOut() {
    this.authService.logout();
    this.isLogin = false;
    this.username = '';
  }
}
