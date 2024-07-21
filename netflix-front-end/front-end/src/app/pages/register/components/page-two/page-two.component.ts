import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  selecedColumn: 'USER' | 'SUPERUSER' | 'ADMIN' = 'USER';

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  selectPlan(user: 'USER' | 'SUPERUSER' | 'ADMIN') {
    this.selecedColumn = user;
  }

  handleNavigate() {
    this.router.navigate(['/movies']);
  }
}
