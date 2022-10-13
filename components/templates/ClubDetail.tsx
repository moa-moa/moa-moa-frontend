import { ILayoutProps } from '@/models/interfaces/props/layout';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { categoryStates } from 'store/categories';
import { clubDetailStates } from 'store/clubDetail';
import { userState } from 'store/user';
import Icons from '../icons';

export default function ClubDetail({ children }: ILayoutProps) {
  const categories = useRecoilValue(categoryStates);
  const userInfo = useRecoilValue(userState);

  const { categoryId, UserLikedClub, owner } =
    useRecoilValue(clubDetailStates)!;

  const category = useMemo(() => {
    return categories.find((cate) => cate.id === categoryId);
  }, [categoryId]);

  const isLiked = useMemo(() => {
    if (UserLikedClub.length === 0) {
      return false;
    }
    return !!UserLikedClub.find((user) => user.userId === userInfo!.id);
  }, [UserLikedClub, userInfo]);

  const isOwner = useMemo(() => {
    return userInfo!.id === owner;
  }, [owner]);

  return (
    <section className='min-h-screen flex flex-col'>
      <header className='sticky top-0 left-0 w-full h-header'>
        <section className='max-w-5xl w-full h-full mx-auto relative'>
          <button className='absolute top-1/2 -translate-y-1/2 left-0'>
            <Icons.Back />
          </button>
          <h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            {category?.name || ''}
          </h1>
          {!isOwner && (
            <button className='absolute top-1/2 -translate-y-1/2 right-0'>
              {isLiked ? <Icons.LikeOn /> : <Icons.LikeOff />}
            </button>
          )}
        </section>
      </header>
      <main className='flex-1 mt-[0.1rem] max-w-5xl w-full mx-auto'>
        {children}
      </main>
      <footer>footer</footer>
    </section>
  );
}
