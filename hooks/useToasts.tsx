import { ToastTypes } from '@/models/interfaces/UI/toast';
import { useCallback, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { toastList } from 'store/toasts';

export default function useToasts() {
  const [list, setList] = useRecoilState(toastList);
  const currentId = useRef(1);
  const addToast = useCallback(
    (type: ToastTypes, message: string) => {
      const newToast = {
        id: `toast-${currentId.current}`,
        type,
        message
      };
      currentId.current += 1;
      setList((prev) => [...prev, newToast]);
    },
    [list]
  );

  const removeToast = useCallback(
    (id: string) => {
      setList((prev) => [...prev].filter((toast) => toast.id !== id));
    },
    [list]
  );

  return {
    addToast,
    removeToast
  };
}
