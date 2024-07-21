import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { PageOneComponent } from './components/page-one/page-one.component';
import { PageTwoComponent } from './components/page-two/page-two.component';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../services/auth/auth.service';

// option 2
const routes: Routes = [
  {
    path: '',
    component: PageOneComponent,
    // children: [{ path: 'register2', component: PageTwoComponent }],
  },
  {
    path: 'register2',
    component: PageTwoComponent,
  },
];

@NgModule({
  declarations: [RegisterComponent, PageOneComponent, PageTwoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [AuthService],
})
export class RegisterModule {}

// option 1
// const routes: Routes = [
//   {
//     path: '',
//     component: RegisterComponent,
//     children: [
//       { path: '', redirectTo: 'register1', pathMatch: 'full' },
//       { path: 'register1', component: PageOneComponent },
//       { path: 'register2', component: PageTwoComponent },
//     ],
//   },
// ];

// const routes: Routes = [
//   {
//     path: '',
//     component: RegisterComponent,
//     children: [
//       { path: '', component: PageOneComponent },
//       { path: 'register2', component: PageTwoComponent },
//     ],
//   },
// ];
