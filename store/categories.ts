import { ICategory } from '@/models/interfaces/data/Category';
import { atom } from 'recoil';
import { v4 as uuid4 } from 'uuid';

const uuid = uuid4();

export const categoryStates = atom<ICategory[]>({
  key: `categoryStates/${uuid}`,
  default: []
});
