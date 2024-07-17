import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { CoreModule } from '../../core/core.module';
// import { LoginGuard } from '../../core/guards/login.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  // canActivate: [LoginGuard]
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    CoreModule.forRoot(),
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthService],
})
export class LoginModule {}
