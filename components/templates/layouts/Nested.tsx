import { ILayoutProps } from '@/models/interfaces/props/layout';
import Header from '@/components/organisms/Header';
import { useScrollPosition } from '@/hooks/useScrollPosition';

export default function Nested({ children }: ILayoutProps) {
  const { scrollY } = useScrollPosition();

  return (
    <section className='min-h-screen flex flex-col'>
      <Header scrollY={scrollY} />
      <main className='flex-1'>{children}</main>
      <footer>footer</footer>
    </section>
  );
}
