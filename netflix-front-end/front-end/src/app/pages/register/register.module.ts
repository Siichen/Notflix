import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageOneComponent } from './components/page-one/page-one.component';
import { RegisterComponent } from './register.component';
import { PageTwoComponent } from './components/page-two/page-two.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../shared/shared.module';

// 方法一
// const routes: Routes = [
//   {
//     path: '',
//     component: RegisterComponent, // 有这一行找registerhtml，没这一行找apphtml
//     children: [
//       { path: '', redirectTo: 'register1', pathMatch: 'full' },
//       { path: 'register1', component: PageOneComponent },
//       { path: 'register2', component: PageTwoComponent },
//     ],
//   },
// ];

// 方法二
const routes: Routes = [
  {
    path: '',
    component: PageOneComponent,
    children: [{ path: 'register2', component: PageTwoComponent }],
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
})
export class RegisterModule {}
