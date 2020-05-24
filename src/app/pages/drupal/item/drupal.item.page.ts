import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DrupalService } from '../drupal.service';
import { DrupalPost } from '../models/drupal-post.model';

@Component({
  templateUrl: 'drupal.item.html',
})
export class DrupalItemPage implements OnInit {
  post: DrupalPost;
  defaultHref = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private drupal: DrupalService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const { id } = params;
      this.drupal.getPost(id).subscribe((item) => {
        this.post = item;
      });
    });
  }

  ionViewDidEnter() {
    this.defaultHref = `${this.router.url.split('/').slice(0, -1).join('/')}`;
  }
}
