import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRowTwoComponent } from './home-row-two.component';

describe('HomeRowTwoComponent', () => {
  let component: HomeRowTwoComponent;
  let fixture: ComponentFixture<HomeRowTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRowTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRowTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
