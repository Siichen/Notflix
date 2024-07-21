import { Component, inject, model, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { TmbdService } from '../../../services/tmbd/tmbd.service';
import { map, Observable, Subscription, tap } from 'rxjs';
import { AppUserAuth } from '../../../interfaces/User/user-auth.interface';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  isLogin$!: Observable<boolean>;
  username$!: Observable<string | null>;
  // isLogin!: boolean;
  // username: string | null = null;
  // private sbp!: Subscription;
  // private auth = inject(AuthService);

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.isLogin$ = this.auth.isLoggedIn$;
    this.username$ = this.auth.username$;
    // this.username = localStorage.getItem('username');
  }

  signOut() {
    this.auth.logout();
  }

  // ngOnDestroy(): void {
  //   this.sbp.unsubscribe();
  // }
}
