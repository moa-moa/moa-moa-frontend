import Layout from '@/components/templates/layouts';
import Organisms from '../organisms';

export default function Home() {
  return (
    <Layout.Nested>
      <Organisms.TabCategories />
      <h1 className='text-3xl underline'>Hello world!</h1>
    </Layout.Nested>
  );
}
