import { Component, OnInit } from '@angular/core';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { catchError, of, switchMap, tap } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;
  selectedArticles = new Set<Article>();
  isRemoving = false;
  errorMsg = '';

  constructor(public articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.articles$
      .pipe(
        tap((articles) => {
          if (articles === undefined) {
            this.articleService.load().subscribe();
          }
        })
      )
      .subscribe();
  }

  refresh() {
    return of(undefined).pipe(
      switchMap(() => {
        this.errorMsg = '';

        return this.articleService.load();
      }),
      catchError((err) => {
        console.log('err: ', err);
        return of(undefined);
      })
    );
  }

  remove() {
    return of(undefined).pipe(
      switchMap(() => {
        const ids = [...this.selectedArticles].map((a) => a.id);
        return this.articleService.remove(ids);
      }),
      switchMap(() => {
        return this.articleService.load();
      }),
      tap(() => {
        this.selectedArticles.clear();
      })
    );
  }

  select(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }

  resetErrorMsg() {
    this.errorMsg = '';
  }

  setErrorMsg(err: Error) {
    this.errorMsg = err.message;
  }
}
