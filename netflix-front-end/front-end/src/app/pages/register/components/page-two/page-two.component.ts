import { CurrencyPipe, NgClass } from '@angular/common';
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
    const { jwtToken } = this.authService.userSignal();

    if (jwtToken) {
      this.authService
        .upgradePermission({
          role: UserRole[this.selecedColumn],
        })
        .subscribe(
          () => {},
          (error) => {
            console.log('show error for updateUserPermission: ', error);
          }
        );
      this.router.navigate(['/movies']);
    } else {
      this.authService
        .signup({ role: UserRole[this.selecedColumn] })
        .subscribe();
      this.router.navigate(['/movies']); // 这里得是login！！！等等回来改。
    }
  }
}
// import { Component } from '@angular/core';

// export interface PlanList {
//   Plan: string;
//   MonthlyPrice: number;
//   VideoQuality: string;
//   Resolution: string;
// }

// @Component({
//   selector: 'app-page-two',
//   templateUrl: './page-two.component.html',
//   styleUrls: ['./page-two.component.scss'],
// })
// export class PageTwoComponent {
//   displayedColumns: string[] = [
//     'empty',
//     'MonthlyPrice',
//     'VideoQuality',
//     'Resolution',
//   ];

//   plans: PlanList[] = [
//     {
//       Plan: 'Basic',
//       MonthlyPrice: 9.99,
//       VideoQuality: 'Good',
//       Resolution: '480p',
//     },
//     {
//       Plan: 'Standard',
//       MonthlyPrice: 15.49,
//       VideoQuality: 'Better',
//       Resolution: '1080p',
//     },
//     {
//       Plan: 'Premium',
//       MonthlyPrice: 19.99,
//       VideoQuality: 'Best',
//       Resolution: '4K + HDR',
//     },
//   ];
// }
