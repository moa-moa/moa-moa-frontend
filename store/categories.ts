import { ICategory } from '@/models/interfaces/data/Category';
import { atom } from 'recoil';

export const categoryStates = atom<ICategory[]>({
  key: 'categoryStates',
  default: []
});
