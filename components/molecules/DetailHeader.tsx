import useToasts from '@/hooks/useToasts';
import ClubService from '@/services/club.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { categoryStates } from 'store/categories';
import { clubDetailStates } from 'store/clubDetail';
import { userState } from 'store/user';
import Icons from '../icons';

export default function DetailHeader() {
  const categories = useRecoilValue(categoryStates);
  const userInfo = useRecoilValue(userState);
  const queryClient = useQueryClient();
  const { addToast } = useToasts();

  const { query, back } = useRouter();
  const clubId = query?.id ? Number(query?.id) : -1;

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

  const onLikeClub = useCallback(() => {
    if (isLiked) {
      console.log('좋아요 취소');
      return;
    }
    likeClub.mutate(clubId);
  }, [isLiked]);

  const likeClub = useMutation(ClubService.like, {
    cacheTime: 0,
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries(['clubList']);
      queryClient.invalidateQueries(['categories']);
      queryClient.invalidateQueries(['clubDetail', clubId]);
      addToast('success', '해당 클럽 찜하기가 완료되었습니다.');
    }
  });

  const onBack = () => {};

  return (
    <header className='sticky top-0 left-0 w-full h-header'>
      <section className='max-w-5xl w-full h-full mx-auto relative'>
        <button
          className='absolute top-1/2 -translate-y-1/2 left-0'
          onClick={() => back()}>
          <Icons.Back />
        </button>
        <h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          {category?.name || ''}
        </h1>
        {!isOwner && (
          <button
            className='absolute top-1/2 -translate-y-1/2 right-0'
            onClick={onLikeClub}>
            {isLiked ? <Icons.LikeOn /> : <Icons.LikeOff />}
          </button>
        )}
      </section>
    </header>
  );
}
