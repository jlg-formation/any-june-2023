import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ArticleService } from './article.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { newArticle } from 'src/tests/data';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add', fakeAsync(() => {
    service.add$(newArticle).subscribe();
    tick(300);
    expect(service).toBeTruthy();
  }));
});
