import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRowThreeComponent } from './home-row-three.component';

describe('HomeRowThreeComponent', () => {
  let component: HomeRowThreeComponent;
  let fixture: ComponentFixture<HomeRowThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRowThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRowThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
