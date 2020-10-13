import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoListComponent } from './videos/video-list/video-list.component';
import { VideoComponent } from './videos/video/video.component';


const routes: Routes = [
  { path: '', component: VideoListComponent },
  { path: 'create', component: VideoComponent },
  { path: 'edit/:videoId', component: VideoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
