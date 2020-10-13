import { VideoModel } from './video.model';

export interface AuthorModel {
  id: number;
  name: string;
  videos: Array<VideoModel>;
}
