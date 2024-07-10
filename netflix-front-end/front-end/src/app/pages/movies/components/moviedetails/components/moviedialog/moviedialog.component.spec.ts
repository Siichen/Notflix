import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviedialogComponent } from './moviedialog.component';

describe('MoviedialogComponent', () => {
  let component: MoviedialogComponent;
  let fixture: ComponentFixture<MoviedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviedialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
