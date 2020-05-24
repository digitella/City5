import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrupalService } from '../drupal.service';
import { DrupalPost } from '../models/drupal-post.model';

@Component({
  templateUrl: 'drupal.list.html',
})
export class DrupalListPage implements OnInit {
  public posts: DrupalPost[];
  public defaultHref = '';

  constructor(
    private drupal: DrupalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.drupal.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  ionViewDidEnter() {
    this.defaultHref = `${this.router.url.split('/').slice(0, -1).join('/')}`;
  }
}
