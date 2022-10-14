import useCategories from '@/hooks/useCategories';
import useClubDetail from '@/hooks/useClubDetail';
import useToasts from '@/hooks/useToasts';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Atoms from '../atoms';
import Icons from '../icons';
import Templates from '../templates';

export default function ClubDetail() {
  const { query } = useRouter();
  const clubId = query?.id ? Number(query?.id) : -1;
  const categories = useCategories();
  const clubDetail = useClubDetail(clubId);

  if (
    categories.isLoading ||
    clubDetail.isLoading ||
    typeof clubDetail.data === 'string'
  ) {
    return <section>Loading...</section>;
  }

  const {
    title,
    description,
    max,
    UserJoinedClub: joined,
    owner
  } = clubDetail.data!;

  return (
    <>
      {clubDetail.data && (
        <Templates.ClubDetail>
          <section className='pt-5 pl-4 pr-4'>
            <h1 className='text-[1.25rem] font-bold leading-[1.875rem] -tracking-[0.01rem]'>
              {title}
            </h1>
            <p className='py-5 text-[0.9375rem] leading-[1.375rem] text-[#777777] font-normal -tracking-[0.01rem]'>
              {description}
            </p>
            <section>
              <header className='flex items-center gap-1.5'>
                <h3 className='font-bold text-[0.9375rem] leading-[1.375rem] -tracking-[0.01rem]'>
                  참여한 멤버
                </h3>
                <div className='flex items-center'>
                  <Icons.People />
                  <span className='text-[0.8125rem] leading-[0.9375rem] font-normal -tracking-[0.01rem] text-gray'>
                    {joined.length} / {max < 300 ? max : '∞'}
                  </span>
                </div>
              </header>

              <main className='mt-2.5 p-[0.9375rem] bg-[#F6F6F6] rounded-[0.3125rem]'>
                <ul className='grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-x-[0.4375rem] gap-y-2.5'>
                  {joined.map(({ User }, index) => (
                    <li
                      key={User.id + index}
                      className='flex items-center gap-2.5'>
                      <section className='relative'>
                        <Atoms.Avatar
                          name={User.name}
                          isAvailable={true}
                          size={36}
                        />
                        {User.id === owner && (
                          <div className='absolute right-0 -bottom-[2px]'>
                            <Icons.CircleCrown />
                          </div>
                        )}
                      </section>
                      <div className='text-[0.75rem] leading-[1.125rem] font-normal text-[#222222] -tracking-[0.01rem]'>
                        {User.name}
                      </div>
                    </li>
                  ))}
                </ul>
              </main>
            </section>
          </section>
        </Templates.ClubDetail>
      )}
    </>
  );
}
