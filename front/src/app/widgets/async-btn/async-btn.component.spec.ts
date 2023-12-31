import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncBtnComponent } from './async-btn.component';

describe('AsyncBtnComponent', () => {
  let component: AsyncBtnComponent;
  let fixture: ComponentFixture<AsyncBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsyncBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
