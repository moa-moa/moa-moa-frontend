import { IClub } from '@/models/interfaces/data/Club';
import { atom } from 'recoil';
import { v4 as uuid4 } from 'uuid';

const uuid = uuid4();

export const clubDetailStates = atom<IClub | null>({
  key: `clubDetailStates/${uuid}`,
  default: null
});
