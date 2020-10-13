import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VideoModel } from '../models/video.model';
import { NameIdModel } from '../models/name-id.model';
import { AuthorModel } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(private http: HttpClient) {}

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

}
