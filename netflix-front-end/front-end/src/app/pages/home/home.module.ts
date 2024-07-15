import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRowOneComponent } from './components/home-row-one/home-row-one.component';
import { HomeRowTwoComponent } from './components/home-row-two/home-row-two.component';
import { HomeRowThreeComponent } from './components/home-row-three/home-row-three.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: HomeRowOneComponent,
    // children: [
    //   { path: '', component: HomeRowOneComponent }, // 你来把这个改一下我看一下
    //   { path: 'row-two', component: HomeRowTwoComponent },
    //   { path: 'row-three', component: HomeRowThreeComponent },
    // ],
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    HomeRowOneComponent,
    HomeRowTwoComponent,
    HomeRowThreeComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class HomeModule {}
