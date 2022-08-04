import Icons from '@/components/atoms/icons';

interface HeaderProps {
  scrollY: number;
}

export default function Haeder({ scrollY }: HeaderProps) {
  const activeShadow = scrollY > 20 ? ' shadow-md' : '';

  return (
    <header className={'h-header sticky top-0 left-0' + activeShadow}>
      <section className='flex justify-center items-center max-w-7xl mx-auto w-full h-full'>
        <Icons.HeaderLogo />
      </section>
    </header>
  );
}
