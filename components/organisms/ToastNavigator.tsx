import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';
import { toastList } from 'store/toasts';
import Atoms from '../atoms';

function ToastPortal({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLElement | null>(null);
  useEffect(() => {
    container.current = document.getElementById('toasts')! as HTMLElement;
  }, []);
  return container.current ? createPortal(children, container.current) : null;
}

export default function ToastNavigator() {
  const toasts = useRecoilValue(toastList);

  return (
    <ToastPortal>
      <section
        className='fixed top-0 left-1/2 -translate-x-1/2 min-w-[17.5rem] z-20'
        style={{
          perspective: '100px'
        }}>
        <ul className='relative'>
          {toasts.map((toast, index) => (
            <Atoms.Toast key={toast.id} index={index} {...toast} />
          ))}
        </ul>
      </section>
    </ToastPortal>
  );
}
