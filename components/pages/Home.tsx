import Layout from '@/components/templates/layouts';
import Organisms from '../organisms';

export default function Home() {
  return (
    <Layout.Nested>
      <Organisms.TabCategories />
      <section className='px-4'>
        <Organisms.AvailableClubs />
        <Organisms.UnAvailableClubs />
      </section>
    </Layout.Nested>
  );
}
