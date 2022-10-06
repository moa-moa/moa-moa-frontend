import { IUser } from '@/models/interfaces/data/User';
import Icons from '../icons';

export default function OwnerBadge({ name }: IUser) {
  return (
    <span className='flex items-center px-[0.3125rem] py-0.5 text-white rounded-[0.3125rem] text-sm bg-default-gray'>
      <Icons.CrownOn /> {name}
    </span>
  );
}
