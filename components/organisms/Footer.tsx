import Icons from '@/components/atoms/icons';
import { ReactElement } from 'react';

interface Button {
  id: 'home' | 'my-page';
  icon: ReactElement;
  link: string;
}

export default function Footer() {
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
    <footer className='h-nav w-full'>
      <ul className='flex'>
        {buttons.map((button) => {
          return (
            <li
              key={button.id}
              className='flex-1 flex justify-center items-center'>
              <button>{button.icon}</button>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}
