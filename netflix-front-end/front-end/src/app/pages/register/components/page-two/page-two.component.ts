import { Component } from '@angular/core';

export interface PlanList {
  Plan: string;
  MonthlyPrice: number;
  VideoQuality: string;
  Resolution: string;
}

@Component({
  selector: 'app-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.scss'],
})
export class PageTwoComponent {
  displayedColumns: string[] = [
    'empty',
    'MonthlyPrice',
    'VideoQuality',
    'Resolution',
  ];

  plans: PlanList[] = [
    {
      Plan: 'Basic',
      MonthlyPrice: 9.99,
      VideoQuality: 'Good',
      Resolution: '480p',
    },
    {
      Plan: 'Standard',
      MonthlyPrice: 15.49,
      VideoQuality: 'Better',
      Resolution: '1080p',
    },
    {
      Plan: 'Premium',
      MonthlyPrice: 19.99,
      VideoQuality: 'Best',
      Resolution: '4K + HDR',
    },
  ];
}
