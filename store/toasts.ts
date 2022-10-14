import { IToast } from '@/models/interfaces/UI/toast';
import { atom } from 'recoil';
import { v4 as uuid4 } from 'uuid';

const uuid = uuid4();

export const toastList = atom<IToast[]>({
  key: `toastList/${uuid}`,
  default: []
});
