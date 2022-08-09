import Layout from '@/components/templates/layouts';
import Organisms from '../organisms';

export default function Home() {
  return (
    <Layout.Nested>
      <Organisms.TabCategories />
      <section className='px-4'>
        <section>
          <Organisms.ClubList />
        </section>
      </section>
    </Layout.Nested>
  );
}
