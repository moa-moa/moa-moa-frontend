import { ReactNode, useMemo } from 'react';
import Organisms from '@/components/organisms';
import { useRouter } from 'next/router';

interface Props {
  children: ReactNode;
}

export default function RenewClub({ children }: Props) {
  const { pathname } = useRouter();
  const title = useMemo(() => {
    if (pathname === '/clubs/[id]/edit') {
      return '모임 수정';
    }
    return '모임 등록';
  }, [pathname]);
  return (
    <section className='min-h-screen flex flex-col'>
      <Organisms.RenewClubHeader title={title} />
      <main className='flex-1 mt-[0.1rem] max-w-5xl w-full mx-auto'>
        {children}
      </main>
    </section>
  );
}
