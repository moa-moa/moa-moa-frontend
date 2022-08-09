import { ILayoutProps } from '@/models/interfaces/props/layout';
import { useScrollPosition } from '@/hooks/useScrollPosition';

import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';

export default function Nested({ children }: ILayoutProps) {
  const { scrollY } = useScrollPosition();

  return (
    <section className='min-h-screen flex flex-col'>
      <Header scrollY={scrollY} />
      <main className='flex-1 mt-[0.1rem] max-w-5xl w-full mx-auto'>
        {children}
      </main>
      <Footer />
    </section>
  );
}
