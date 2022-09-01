import { ReactElement, useMemo } from 'react';
import { useRouter } from 'next/router';

import Icons from '@/components/icons';
import GnbItem from '@/components/atoms/GnbItem';

interface Button {
  id: 'home' | 'profile';
  icon: ReactElement;
  link: string;
}

export default function Gnb() {
  const buttons = getButtons();

  return (
    <nav className='max-w-7xl mx-auto w-full h-full'>
      <ul className='flex'>
        {buttons.map((button) => {
          return <GnbItem key={button.id} {...button} />;
        })}
      </ul>
    </nav>
  );
}

function getButtons() {
  const router = useRouter();
  const buttons = useMemo<Button[]>(() => {
    return [
      {
        id: 'home',
        link: '/',
        get icon() {
          return this.link === router.pathname ? (
            <Icons.HomeOn />
          ) : (
            <Icons.HomeOff />
          );
        }
      },
      {
        id: 'profile',
        link: '/profile',
        get icon() {
          return this.link === router.pathname ? (
            <Icons.MyPageOn />
          ) : (
            <Icons.MyPageOff />
          );
        }
      }
    ];
  }, [router.pathname]);

  return buttons;
}
