import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  isOpen: boolean;
}

export default function Modal({ children, isOpen }: Props) {
  if (!isOpen) {
    return <></>;
  }

  return (
    <section className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000]'>
      {children}
    </section>
  );
}
