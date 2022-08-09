import { ICategory } from './Category';
import { IUser } from './User';

export interface IClub {
  id: number;
  title: string;
  description?: string;
  owner: string;
  isAvailable: boolean;
  max: number;
  category: ICategory;
  userLikedClub?: IUser[];
  userJoinedClub: IUser[];
  userCreatedClub?: IUser[];
}
