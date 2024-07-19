import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { UserRole } from '../../../../interfaces/User/user-auth.interface';

@Component({
  selector: 'app-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.scss'],
})
export class PageTwoComponent implements OnInit {
  plans = {
    Basic: {
      MonthlyPrice: 9.99,
      VideoQuality: 'Good',
      Resolution: '480p',
    },
    Standard: {
      MonthlyPrice: 15.49,
      VideoQuality: 'Better',
      Resolution: '1080p',
    },
    Premium: {
      MonthlyPrice: 19.99,
      VideoQuality: 'Best',
      Resolution: '4K + HDR',
    },
  };
  selecedColumn: 'USER' | 'SUPERUSER' | 'ADMIN' = 'ADMIN';

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}
  ngOnInit(): void {}

  selectPlan(user: 'USER' | 'SUPERUSER' | 'ADMIN') {
    this.selecedColumn = user;
  }

  handleNavigate() {
    const currentUser = this.authService.userSubject.getValue();

    if (currentUser && currentUser.jwtToken) {
      this.authService
        .upgradePermission({
          role: UserRole[this.selecedColumn],
        })
        .subscribe(
          () => {
            this.router.navigate(['/movies']);
          },
          (error) => {
            console.error('Error upgrading user permission: ', error);
          }
        );
    } else {
      console.error('No user or jwtToken found. Redirecting to login.');
      this.router.navigate(['/login']);
    }
  }
}
