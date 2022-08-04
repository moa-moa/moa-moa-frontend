import Icons from '@/components/icons';

interface HeaderProps {
  scrollY: number;
}

export default function Haeder({ scrollY }: HeaderProps) {
  const activeShadow = scrollY > 20 ? ' shadow-md' : '';

  return (
    <header
      className={
        'h-header flex justify-center items-center sticky top-0 left-0' +
        activeShadow
      }
    >
      <Icons.HeaderLogo />
    </header>
  );
}
