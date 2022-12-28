import { Component, OnInit } from '@angular/core';

import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/stock/services/article.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  displayedColumns = ['name', 'price', 'qty'];
  errorMsg = '';
  isRefreshing = false;
  isRemoving = false;
  selectedArticles = new Set<Article>();

  constructor(public articleService: ArticleService) {}

  ngOnInit(): void {
    if (this.articleService.articles === undefined) {
      this.articleService.load();
    }
  }

  async refresh() {
    try {
      this.errorMsg = '';
      this.isRefreshing = true;
      await this.articleService.load();
    } catch (err) {
      console.log('err: ', err);
    } finally {
      this.isRefreshing = false;
    }
  }

  async remove() {
    try {
      this.errorMsg = '';
      this.isRemoving = true;
      const ids = [...this.selectedArticles].map((a) => a.id);
      await this.articleService.remove(ids);
      await this.articleService.load();
      this.selectedArticles.clear();
    } catch (err) {
      console.log('err: ', err);
      this.errorMsg = 'Cannot suppress';
    } finally {
      this.isRemoving = false;
    }
  }

  select(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }
}
