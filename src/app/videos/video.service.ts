import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VideoModel } from '../models/video.model';
import { NameIdModel } from '../models/name-id.model';
import { AuthorModel } from '../models/author.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(private http: HttpClient, private router: Router) {}

  getAuthors(): Observable<Array<AuthorModel>> {
    return this.http.get<Array<AuthorModel>>('http://localhost:3000/authors');
  }


  getVideos(): Observable<Array<VideoModel>> {
    return this.getAuthors().pipe(
      map((authors) => authors.reduce((videos, author) => {
          return [...videos, ...author.videos.map((video) => {
            return {
                ...video,
                author: {
                  id: author.id,
                  name: author.name
                }};
          })];
        }, [])
          ));
  }

  getCategories(): Observable<Array<NameIdModel>> {
    return this.http.get<Array<NameIdModel>>('http://localhost:3000/categories');
  }

  getVideo(videoId: number): Observable<VideoModel> {
    return this.getVideos().pipe(
      map(data => data.find(video => video.id === videoId)));
  }

  getAuthorNameId(): Observable<Array<NameIdModel>> {
    return this.getAuthors().pipe(
      map(authors => {
        return authors.map((author) => {
          return  {
            id: author.id,
            name: author.name
          };
        });
         }));
  }

  addVideo(video: VideoModel) {
    // add video to the specific author
    this.router.navigate(['/']);
  }

  updateVideo(video: VideoModel) {
    // find the video and change that
    // if its author has been changed we need remove the video from previous author and add to new one
   this.router.navigate(['/']);
  }

}
