import { ReactNode } from 'react';
import Organisms from '@/components/organisms';

interface Props {
  children: ReactNode;
}

export default function RenewClub({ children }: Props) {
  return (
    <section className='min-h-screen flex flex-col'>
      <Organisms.RenewClubHeader title='모임 등록' />
      <main className='flex-1 mt-[0.1rem] max-w-5xl w-full mx-auto'>
        {children}
      </main>
    </section>
  );
}
