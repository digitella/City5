import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WordpressPost } from '../models/wordpress-post.model';
import { WordpressService } from '../wordpress.service';

@Component({
  templateUrl: 'wordpress.item.html',
})
export class WordPressItemPage implements OnInit {
  post: WordpressPost;
  defaultHref = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private wordpressService: WordpressService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const { id } = params;
      this.wordpressService.getPost(id).subscribe((item) => {
        this.post = item;
      });
    });
  }

  ionViewDidEnter() {
    this.defaultHref = `${this.router.url.split('/').slice(0, -1).join('/')}`;
  }
}
