export interface ICategoryBadge {
  id: string;
  type: 'category';
  backColor: string;
  text: string;
}

export interface ICategoryOfClubBadge {
  id: string;
  type: 'category-of-club';
  backColor: string;
  text: string;
}

export interface ICreatorBadge {
  id: string;
  type: 'person';
  backColor: string;
  text: string;
}