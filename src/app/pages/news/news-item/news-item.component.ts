import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent implements OnInit {
  post: any = {};
  defaultHref = '';

  constructor(
    private newsService: NewsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.post = this.newsService.getCurrent();
    if (!this.post) {
      this.init();
    }
  }

  ionViewDidEnter() {
    this.defaultHref = `${this.router.url.split('/').slice(0, -1).join('/')}`;
  }

  private init() {
    const lastIds = _.takeRight(this.router.url.split('/'), 3);
    this.newsService.getPosts(lastIds[0])
      .then((posts) => {
        this.post = posts.find((post) => {
          return post.$key === lastIds[0];
        });
      });
  }
}
