import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WordpressService } from './../wordpress.service';
import { WordpressPost } from '../models/wordpress-post.model';

@Component({
  templateUrl: 'wordpress.list.html',
})
export class WordPressListPage implements OnInit {
  public posts: WordpressPost[];
  public defaultHref = '';

  constructor(
    private wordpressService: WordpressService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.wordpressService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  ionViewDidEnter() {
    this.defaultHref = `${this.router.url.split('/').slice(0, -1).join('/')}`;
  }
}
