import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { AppUser } from '../interfaces/User/user-login.interface';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const testUser: AppUser = { email: 'david@gmail.com', password: 'david' };
    this.authService.login(testUser).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
