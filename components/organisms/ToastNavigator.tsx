import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function ToastPortal({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLElement | null>(null);
  useEffect(() => {
    container.current = document.getElementById('toasts')! as HTMLElement;
  }, []);
  return container.current ? createPortal(children, container.current) : null;
}

export default function ToastNavigator() {
  return (
    <ToastPortal>
      <section>
        <ul>
          <li>Hello</li>
        </ul>
      </section>
    </ToastPortal>
  );
}
