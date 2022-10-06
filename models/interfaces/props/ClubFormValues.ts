import { IPhoto } from '../data/Photo';

export interface ClubFormValues {
  category: number;
  title: string;
  description: string;
  max: number;
  images: IPhoto[];
}
