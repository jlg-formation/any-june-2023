import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ArticleService, url } from './article.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { newArticle } from 'src/tests/data';
import { catchError, of } from 'rxjs';

describe('ArticleService', () => {
  let service: ArticleService;
  let ctrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ArticleService);
    ctrl = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    ctrl.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add', fakeAsync(() => {
    service.add$(newArticle).subscribe();
    tick(300);
    const req = ctrl.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush('');
    expect(service).toBeTruthy();
  }));

  it('should add in error', fakeAsync(() => {
    let shouldGoHere = false;
    service
      .add$(newArticle)
      .pipe(
        catchError(() => {
          shouldGoHere = true;
          return of(undefined);
        })
      )
      .subscribe();
    tick(300);
    const req = ctrl.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush('', { status: 500, statusText: 'Internal Error' });
    expect(shouldGoHere).toBeTruthy();
  }));

  it('should load', fakeAsync(() => {
    service.load().subscribe();
    const req = ctrl.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush('');
    tick(1000);
    expect(service).toBeTruthy();
  }));

  it('should load in error', fakeAsync(() => {
    service.load().subscribe();

    const req = ctrl.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush('', { status: 500, statusText: 'Internal Error' });

    expect(service).toBeTruthy();
  }));

  it('should delete', fakeAsync(() => {
    service.remove([]).subscribe();
    tick(1000);
    const req = ctrl.expectOne(url);
    expect(req.request.method).toEqual('DELETE');
    req.flush('');
    expect(service).toBeTruthy();
  }));

  it('should delete in error', fakeAsync(() => {
    let shouldGoHere = false;
    service
      .remove([])
      .pipe(
        catchError(() => {
          shouldGoHere = true;
          return of(undefined);
        })
      )
      .subscribe();
    tick(1000);
    const req = ctrl.expectOne(url);
    expect(req.request.method).toEqual('DELETE');
    req.flush('', { status: 500, statusText: 'Internal Error' });
    expect(shouldGoHere).toBeTruthy();
  }));
});
