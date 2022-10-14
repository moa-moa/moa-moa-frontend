import { IUser } from './User';

export interface IClub {
  id: number;
  title: string;
  description?: string;
  owner: string;
  isAvailable: boolean;
  max: number;
  categoryId: number;
  ClubImage?: {
    Image: {
      id: string;
      imagePath: string;
      type: string;
    };
    clubId: number;
    imageId: string;
  }[];
  UserLikedClub: {
    User: IUser;
    clubId: number;
    userId: string;
  }[];
  UserJoinedClub: {
    User: IUser;
    clubId: number;
    userId: string;
  }[];
}

export interface IClubBody {
  categoryId: number;
  title: string;
  description: string;
  owner?: string;
  max: number;
  imageIds?: string[];
}
