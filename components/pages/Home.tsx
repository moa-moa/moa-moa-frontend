import Layout from '@/components/templates';
import Organisms from '../organisms';
import Atoms from '../atoms';
import Modal from '../atoms/Modal';
import { Router, useRouter } from 'next/router';
import useCategories from '@/hooks/useCategories';
import { useState } from 'react';
import Icons from '../icons';

export default function Home() {
  const { asPath, push } = useRouter();
  const { data, isLoading, isError } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(-1);

  return (
    <Layout.Nested>
      <Organisms.TabCategories
        info={{ data, isLoading, isError }}
        options={{
          withAllandEnd: true,
          selected: {
            id: selectedCategoryId,
            set: (id: number) => setSelectedCategoryId(id)
          }
        }}
      />
      <section className='px-4'>
        <Organisms.ClubList />
      </section>
      <Atoms.CreateClubButton />
      <Modal isOpen={asPath.split('#')[1] === 'createClubModal'}>
        <section className='relative w-screen h-screen flex justify-center items-center'>
          <section className='relative w-full max-w-xl h-auto max-h-full bg-white py-4 flex flex-col z-10'>
            <header className='px-4 mb-5'>
              <h1 className='text-xl font-bold'>모임 생성</h1>
              <p className='text-sm'>모아모아 모임을 생성합니다.</p>
              <button
                className='absolute z-10 top-2 right-2'
                onClick={() => push('/')}>
                <Icons.Close />
              </button>
            </header>
            <main className='overflow-y-auto'>
              <Organisms.ClubForm isModal={true} />
            </main>
          </section>
          <section
            className='absolute top-0 left-0 w-screen h-screen bg-loading-bg z-0'
            onClick={() => push('/')}></section>
        </section>
      </Modal>
    </Layout.Nested>
  );
}
