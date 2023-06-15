import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  delay,
  map,
  of,
  switchMap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, NewArticle } from '../interfaces/article';

const url = environment.apiDomain + '/api/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private articles: Article[] | undefined;
  articles$ = new BehaviorSubject<Article[] | undefined>(undefined);
  errorMsg = '';

  constructor(private http: HttpClient) {}

  add$(newArticle: NewArticle): Observable<void> {
    return of(undefined).pipe(
      delay(300),
      switchMap(() => {
        return this.http.post<void>(url, newArticle);
      }),
      catchError((err) => {
        console.log('err: ', err);
        throw new Error('Technical error');
      })
    );
  }

  load(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        this.errorMsg = '';
        return this.http.get<Article[]>(url);
      }),
      delay(1000),
      map((articles) => {
        this.articles = articles;
        this.articles$.next(this.articles);
      }),
      catchError((err) => {
        console.log('err: ', err);
        this.errorMsg = 'Technical Error';
        return of(undefined);
      })
    );
  }

  remove(ids: string[]): Observable<void> {
    return of(undefined).pipe(
      delay(1000),
      switchMap(() =>
        this.http.delete<void>(url, {
          body: ids,
        })
      ),
      catchError((err) => {
        console.log('err: ', err);
        throw new Error('Technical error');
      })
    );
  }
}
