import { ILayoutProps } from '@/models/interfaces/props/layout';

import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';

export default function Nested({ children }: ILayoutProps) {
  return (
    <section className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-1 mt-[0.1rem] max-w-5xl w-full mx-auto'>
        {children}
      </main>
      <Footer />
    </section>
  );
}
