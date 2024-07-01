import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRowOneComponent } from './home-row-one.component';

describe('HomeRowOneComponent', () => {
  let component: HomeRowOneComponent;
  let fixture: ComponentFixture<HomeRowOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRowOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRowOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
