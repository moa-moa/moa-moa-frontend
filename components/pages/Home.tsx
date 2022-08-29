import Layout from '@/components/templates/layouts';
import Organisms from '../organisms';
import Atoms from '../atoms';
import Modal from '../atoms/Modal';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <Layout.Nested>
      <Organisms.TabCategories />
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
