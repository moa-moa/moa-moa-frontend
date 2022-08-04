import Icons from '@/components/atoms/icons';
import { ReactElement } from 'react';
import GnbItem from '@/components/atoms/gnb/GnbItem';

interface Button {
  id: 'home' | 'my-page';
  icon: ReactElement;
  link: string;
}

export default function Gnb() {
  const buttons: Button[] = [
    {
      id: 'home',
      icon: <Icons.HomeOff />,
      link: '/'
    },
    {
      id: 'my-page',
      icon: <Icons.MyPageOff />,
      link: '/'
    }
  ];

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
