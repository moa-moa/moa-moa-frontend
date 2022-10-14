import { ToastTypes } from '@/models/interfaces/UI/toast';
import { useCallback, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { toastList } from 'store/toasts';
import { v4 as uuid4 } from 'uuid';

export default function useToasts() {
  const [list, setList] = useRecoilState(toastList);
  const addToast = useCallback(
    (type: ToastTypes, message: string) => {
      const sequence = uuid4();
      const newToast = {
        id: `toast-${sequence}`,
        type,
        message
      };
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
