import { NameIdModel } from './Name-id.model';

export interface VideoModel {
  id: number;
  catIds: Array<number>;
  name: string;
  formats: {
    [name: string]: {
        res: string;
        size: number;
    }
};
releaseDate: string;
author: NameIdModel;
}
