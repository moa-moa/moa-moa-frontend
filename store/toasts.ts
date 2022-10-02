import { IToast } from '@/models/interfaces/UI/toast';
import { atom } from 'recoil';

export const toastList = atom<IToast[]>({
  key: 'toastList',
  default: []
});
