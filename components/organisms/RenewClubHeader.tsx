import { useRouter } from 'next/router';
import { useMemo } from 'react';
import Icons from '../icons';

interface Props {
  title: string;
}

export default function RenewClubHeader({ title }: Props) {
  const { back, push, query } = useRouter();
  const clubId = useMemo(() => {
    return query?.id || null;
  }, [query]);

  return (
    <header className='h-header sticky top-0 left-0 bg-white z-10 px-4'>
      <section className='relative max-w-5xl mx-auto w-full h-full'>
        <button
          className='absolute left-2 top-1/2 -translate-y-1/2'
          onClick={() => (clubId ? back() : push('/'))}>
          <Icons.Back />
        </button>
        <h1 className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-lg text-[#222222] font-normal'>
          {title}
        </h1>
      </section>
    </header>
  );
}
