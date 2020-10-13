import { VideoService } from './../video.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { NameIdModel } from 'src/app/models/Name-id.model';
import { VideoModel } from 'src/app/models/video.model';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit, AfterViewInit {

  constructor(private videoService: VideoService) { }
  categories: Array<NameIdModel> = [];
  displayedColumns = ['name', 'author', 'categoryName', 'highestQuality', 'releaseDate', 'options'];
  videosDataSource = new MatTableDataSource<VideoModel>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
   this.videoService.getCategories().subscribe((categories) => {
      this.categories = categories;
   });
   this.videoService.getVideos()
      .subscribe((videos: Array<VideoModel>) => {
        this.videosDataSource.data = videos;
      });
}

ngAfterViewInit(): void {
    this.videosDataSource.sort = this.sort;
}

getCategoryNames(catIds: Array<number>) {
  let names = '';
  const selectedCategories = this.categories.filter(category => catIds.includes(category.id));
  selectedCategories.forEach((category, index) => {
    names += index !== selectedCategories.length - 1 ? category.name + ',' : category.name;
  });
  return names;
}

getHighestFormat(formats: any) {
  let highest = {res: 0 , size: 0};
  let highestFormat = '';
  Object.keys( formats ).forEach(( key ) => {
   const formatQuality = parseInt(formats[key].res, 0);
   if (formatQuality > highest.res || (formatQuality === highest.res && formats[key].size > highest.size)) {
     highest = {res: formatQuality, size: formats[key].size};
     highestFormat = key + ' ' + formats[key].res;
   }
});
  return highestFormat;
}

deleteVideo(videoId: number) {
// delete a specific video
}

applyFilter(filterValue: string) {
  this.videosDataSource.filter = filterValue.trim().toLowerCase();
}

}
