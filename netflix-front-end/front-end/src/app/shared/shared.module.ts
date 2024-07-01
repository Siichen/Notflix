import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';



@NgModule({
  declarations: [
    MainHeaderComponent,
    MainFooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
