import { IPhoto } from '../data/Photo';

export interface ClubFormValues {
  title: string;
  description: string;
  max: number;
  images: IPhoto[];
}
