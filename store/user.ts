import { IUser } from '@/models/interfaces/data/User';
import { atom } from 'recoil';
import { v4 as uuid4 } from 'uuid';

const uuid = uuid4();

export const userState = atom<IUser | null>({
  key: `userState/${uuid}`,
  default: null
});
