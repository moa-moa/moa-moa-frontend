import Layout from '@/components/templates/layouts';

export default function Home() {
  return (
    <Layout.Nested>
      <h1 className='text-3xl underline'>Hello world!</h1>
    </Layout.Nested>
  );
}
