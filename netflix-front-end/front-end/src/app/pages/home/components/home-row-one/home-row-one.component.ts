import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-row-one',
  templateUrl: './home-row-one.component.html',
  styleUrls: ['./home-row-one.component.scss'],
})
export class HomeRowOneComponent {
  constructor(private router: Router) {}

  jumpto(): void {
    this.router.navigate(['login']);
  }
}
