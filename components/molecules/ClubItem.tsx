import Icons from '../atoms/icons';
import { IClub } from '@/models/interfaces/data/Club';
import { BadgeType } from '@/models/types/UI/badge';
import Atom from '../atoms';
import { ICategory } from '@/models/interfaces/data/Category';
import Link from 'next/link';

export default function ClubItem({
  id,
  owner,
  category,
  max,
  title,
  userJoinedClub
}: IClub) {
  const badges = getBadges(owner, category);

  return (
    <li>
      <Link href={`/club/${id}`}>
        <a className='block p-5 bg-light-gray rounded-[0.3125rem]'>
          <div className='flex items-center mb-2'>
            <div className='flex gap-[0.3125rem] mr-2.5'>
              {badges.map((badge) => (
                <Atom.Badge key={badge.id} {...badge} />
              ))}
            </div>

            <ul className='flex flex-1'>
              {userJoinedClub.map((user, index) => {
                return (
                  <li
                    key={'joinUser-' + user.id}
                    className={index ? '-ml-1' : ''}>
                    <Atom.Avatar name={user.name} image={user.image} />
                  </li>
                );
              })}
            </ul>

            <div className='text-sm flex'>
              <Icons.People />
              <div className='ml-1 text-sm text-gray'>
                <span>{userJoinedClub.length + 1}</span>
                <span className='mx-1'>/</span>
                <span>{max}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className='font-bold text-base'>{title}</h2>
          </div>
        </a>
      </Link>
    </li>
  );
}

function getBadges(owner: string, category: ICategory): BadgeType[] {
  return [
    {
      id: 'badge-1',
      type: 'category-of-club',
      backColor: category.backColor,
      text: category.name
    },
    {
      id: 'badge-2',
      type: 'person',
      backColor: '#aaaaaa',
      text: owner
    }
  ];
}
