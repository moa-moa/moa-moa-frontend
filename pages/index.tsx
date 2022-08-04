import type { NextPage } from 'next';
import Layout from '@/components/templates/layouts';

const Home: NextPage = () => {
  return (
    <Layout.Nested>
      <h1 className='text-3xl underline'>Hello world!</h1>
    </Layout.Nested>
  );
};

export default Home;
