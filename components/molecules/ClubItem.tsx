import Icons from '../icons';
import { IClub } from '@/models/interfaces/data/Club';
import Atom from '../atoms';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { categoryStates } from 'store/categories';
import { useMemo } from 'react';
import Atoms from '../atoms';

export default function ClubItem({
  id,
  title,
  max,
  categoryId,
  UserJoinedClub: joined
}: IClub) {
  const categories = useRecoilValue(categoryStates);
  const category = useMemo(
    () => categories.find((cate) => cate.id === categoryId),
    [categoryId]
  )!;
  const creator = joined[0].User;

  return (
    <li>
      <Link href={`/clubs/${id}`}>
        <a className='block p-5 bg-light-gray rounded-[0.3125rem]'>
          <section className='flex items-center mb-2'>
            <section className='flex gap-[0.3125rem] mr-2.5'>
              <Atoms.CategoryBadge {...category} />
              <Atoms.OwnerBadge {...creator} />
            </section>

            <section className='flex-1'>
              <ul className='flex'>
                {joined.map(({ User, userId }) => (
                  <li key={userId} className='first:ml-0 -ml-1'>
                    <Atom.Avatar name={User.name} isAvailable={true} />
                  </li>
                ))}
              </ul>
            </section>

            <section className='flex'>
              <Icons.People />
              <div className='ml-1 text-sm text-gray'>
                {joined.length} / {max || '∞'}
              </div>
            </section>
          </section>

          <section>
            <h3 className='truncate font-bold text-base'>{title}</h3>
          </section>
        </a>
      </Link>
    </li>
  );
}
