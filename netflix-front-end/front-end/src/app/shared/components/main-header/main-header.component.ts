import { Component, inject, model, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { map, Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  // store observable
  isLogin$!: Observable<boolean>;
  username$!: Observable<string | null>;
  // isLogin!: boolean;
  // username: string | null = null;
  // private sbp!: Subscription = new Subscription;
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

  // use async pipe instead of life hook
  // ngOnDestroy(): void {
  //   this.sbp.unsubscribe();
  // }
}
