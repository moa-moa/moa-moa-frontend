import { IClub } from './Club';

export interface ICategory {
  id: number;
  name: string;
  backColor: string;
  Club: IClub[];
}
