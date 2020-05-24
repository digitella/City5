import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinessesService } from 'src/app/services/businesses.service';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit {
  business: any;
  posts: any[];
  defaultHref = '';

  constructor(
    private newsService: NewsService,
    private businessService: BusinessesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.business = this.businessService.getCurrent();
    if (!this.business) {
      this.init();
    } else {
      this.getPosts();
    }
  }

  ionViewDidEnter() {
    this.defaultHref = `${this.router.url.split('/').slice(0, -1).join('/')}`;
  }

  itemTapped(post) {
    this.newsService.setCurrent(post);
    this.router.navigate([`${post.$key}`], {relativeTo: this.route});
  }

  private init() {
    this.route.params.subscribe((params) => {
      this.businessService.getBusinessById(params.id).then((business) => {
        this.business = business;
        this.getPosts();
      });
    });
  }

  private getPosts() {
    this.newsService.getPosts(this.business.$key)
      .then((posts) => {
        this.posts = posts;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
