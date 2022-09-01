import Layout from '@/components/templates';
import Atoms from '../atoms';
import Icons from '../icons';

export default function Login() {
  return (
    <Layout.Void>
      <section className='fixed w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center'>
        <div className='w-[13.75rem] h-9 mb-12'>
          <Icons.Logo width='220' height='36' />
        </div>
        <Atoms.LoginButton />
      </section>
    </Layout.Void>
  );
}
