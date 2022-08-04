import { ReactElement } from 'react';

interface GnbItemProps {
  icon: ReactElement;
  link: string;
}

export default function GnbItem({ icon, link }: GnbItemProps) {
  return (
    <li className='flex-1 flex justify-center items-center'>
      <button>{icon}</button>
    </li>
  );
}
