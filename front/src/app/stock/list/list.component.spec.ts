import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { a1 } from 'src/tests/data';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should refresh', () => {
    spyOn(component['articleService'], 'load').and.returnValue(of(undefined));
    component.refresh();
    expect(component).toBeTruthy();
  });
  it('should refresh in error', () => {
    spyOn(component['articleService'], 'load').and.returnValue(
      throwError(() => new Error('oups'))
    );
    component.refresh();
    expect(component).toBeTruthy();
  });

  it('should remove', () => {
    component.selectedArticles.add(a1);
    spyOn(component['articleService'], 'remove').and.returnValue(of(undefined));
    spyOn(component['articleService'], 'load').and.returnValue(of(undefined));
    component.remove();
    expect(component).toBeTruthy();
  });

  it('should remove in error', () => {
    component.selectedArticles.add(a1);
    spyOn(component['articleService'], 'remove').and.returnValue(of(undefined));
    spyOn(component['articleService'], 'load').and.returnValue(
      throwError(() => new Error('oups'))
    );
    component.remove();
    expect(component).toBeTruthy();
  });

  it('should select', () => {
    component.selectedArticles = new Set([]);
    component.select(a1);
    expect(component).toBeTruthy();
  });
  it('should unselect', () => {
    component.selectedArticles = new Set([a1]);
    component.select(a1);
    expect(component).toBeTruthy();
  });
});
