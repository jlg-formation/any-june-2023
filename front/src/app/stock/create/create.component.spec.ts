import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { ArticleService } from 'src/app/services/article.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ArticleService],
      declarations: [CreateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', () => {
    spyOn(component['articleService'], 'add$').and.returnValue(of(undefined));
    spyOn(component['articleService'], 'load').and.returnValue(of(undefined));
    component.submit();
    expect(component).toBeTruthy();
  });

  it('should submit in error', () => {
    spyOn(component['articleService'], 'add$').and.returnValue(of(undefined));
    spyOn(component['articleService'], 'load').and.returnValue(
      throwError(() => new Error('oups'))
    );
    component.submit();
    expect(component).toBeTruthy();
  });
});
