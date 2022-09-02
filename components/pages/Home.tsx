import Layout from '@/components/templates';
import Organisms from '../organisms';
import Atoms from '../atoms';
import Modal from '../atoms/Modal';
import { useRouter } from 'next/router';
import useCategories from '@/hooks/useCategories';

export default function Home() {
  const router = useRouter();
  const { data, isLoading, isError } = useCategories();

  return (
    <Layout.Nested>
      <Organisms.TabCategories info={{ data, isLoading, isError }} />
      <section className='px-4'>
        <Organisms.AvailableClubs />
        <Organisms.UnAvailableClubs />
      </section>
      <Atoms.CreateClubButton />
      <Modal isOpen={!!router.query.cmd}>
        <h1>Hello</h1>
      </Modal>
    </Layout.Nested>
  );
}
