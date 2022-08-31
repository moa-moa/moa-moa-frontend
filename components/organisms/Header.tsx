import { useScrollPosition } from '@/hooks/useScrollPosition';
import Icons from '@/components/icons';

export default function Haeder() {
  const { scrollY } = useScrollPosition();
  const activeShadow = scrollY > 20 ? ' shadow-md' : '';

  return (
    <header
      className={'h-header sticky top-0 left-0 bg-white z-10' + activeShadow}>
      <section className='flex justify-center items-center max-w-5xl mx-auto w-full h-full'>
        <Icons.HeaderLogo />
      </section>
    </header>
  );
}
