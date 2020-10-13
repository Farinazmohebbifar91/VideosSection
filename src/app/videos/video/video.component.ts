import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NameIdModel } from 'src/app/models/Name-id.model';
import { VideoModel } from 'src/app/models/video.model';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, OnDestroy {
  video: VideoModel;
  authors: Array<NameIdModel>;
  categories: Array<NameIdModel>;
  isLoading = false;
  private mode = 'create';
  private videoId: number;
  private subscriptions: Subscription;

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscriptions =
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('videoId')) {
        this.mode = 'edit';
        this.videoId = + paramMap.get('videoId');
        this.isLoading = true;
        this.videoService.getVideo(this.videoId).subscribe((videoData: VideoModel) => {
          this.isLoading = false;
          this.video = videoData;
        });
      } else {
        this.mode = 'create';
        this.videoId = null;
      }
    });
    this.getAuthors();
    this.getCategories();
  }

  getAuthors() {
    this.subscriptions.add(
    this.videoService.getAuthorNameId().subscribe((authors: Array<NameIdModel>) => {
      this.authors = authors;
    }));
  }

  getCategories() {
    this.subscriptions.add(
    this.videoService.getCategories().subscribe((categories: Array<NameIdModel>) => {
      this.categories = categories;
    }));
  }

  onSaveVideo(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const video: VideoModel = {
      id: null,
      name: form.value.name,
      catIds: form.value.category,
      author: {id: form.value.author, name: ''},
      formats: {
        one: {
         res: '1080p',
         size: 1000 }
        },
      releaseDate: '2018-08-09'
    };
    if (this.mode === 'create') {
      this.subscriptions.add(
      this.videoService.addVideo(video));
    } else {
      video.id = this.videoId;
      this.subscriptions.add(
      this.videoService.updateVideo(video));
    }
    form.resetForm();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  cancel() {
    this.subscriptions.unsubscribe();
    this.router.navigate(['/']);
  }
}
