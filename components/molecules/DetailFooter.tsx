import useToasts from '@/hooks/useToasts';
import ClubService from '@/services/club.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { clubDetailStates } from 'store/clubDetail';
import { userState } from 'store/user';
import Modal from '../atoms/Modal';

export default function DetailFooter() {
  const userInfo = useRecoilValue(userState)!;
  const { owner, UserJoinedClub } = useRecoilValue(clubDetailStates)!;
  const [open, setOpen] = useState(false);

  const { query, push } = useRouter();
  const clubId = query?.id ? Number(query?.id) : -1;
  const queryClient = useQueryClient();
  const { addToast } = useToasts();

  const joinClub = useMutation(ClubService.join, {
    cacheTime: 0,
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries(['clubList']);
      queryClient.invalidateQueries(['categories']);
      queryClient.invalidateQueries(['clubDetail', clubId]);
      addToast('success', '해당 모임에 참여하였습니다.');
    },
    onError: (error: any) => {
      addToast('error', error.message);
    }
  });
  const leaveClub = useMutation(ClubService.leave, {
    cacheTime: 0,
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries(['clubList']);
      queryClient.invalidateQueries(['categories']);
      queryClient.invalidateQueries(['clubDetail', clubId]);
      addToast('success', '해당 모임을 탈퇴하였습니다.');
    },
    onError: (error: any) => {
      addToast('error', '[에러] 모임 탈퇴에 실패하였습니다.');
    }
  });
  const removeClub = useMutation(ClubService.remove, {
    cacheTime: 0,
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries(['clubList']);
      queryClient.invalidateQueries(['categories']);
      addToast('success', '해당 모임을 폭파하였습니다.');
      push('/');
    },
    onError: (error: any) => {
      addToast('error', '[에러] 모임 폭파에 실패하였습니다.');
    }
  });

  const isOwner = useMemo(() => {
    return userInfo.id === owner;
  }, [owner, userInfo]);

  const isJoined = useMemo(() => {
    return !!UserJoinedClub.find(({ User }) => User.id === userInfo.id);
  }, [userInfo, UserJoinedClub]);

  const onRemoveClub = useCallback(() => {
    removeClub.mutate(clubId);
  }, [clubId]);

  return (
    <footer className='fixed left-0 bottom-0 w-full h-nav'>
      <section className='max-w-5xl w-full h-full mx-auto'>
        {isOwner ? (
          <button
            className='w-full h-full bg-[#222222] text-white text-[1rem] leading-6 font-normal -tracking-[0.01rem]'
            onClick={() => {
              setOpen(true);
            }}>
            모임 폭파하기
          </button>
        ) : isJoined ? (
          <button
            className='w-full h-full bg-[#222222] text-white text-[1rem] leading-6 font-normal -tracking-[0.01rem]'
            onClick={() => leaveClub.mutate(clubId)}>
            모임 나갈게요
          </button>
        ) : (
          <button
            className='w-full h-full bg-moa-pink text-white text-[1rem] leading-6 font-normal -tracking-[0.01rem]'
            onClick={() => joinClub.mutate(clubId)}>
            참여할래요
          </button>
        )}
      </section>
      <Modal isOpen={open} className='fade-in'>
        <section className='max-w-[19.375rem] w-screen relative border border-gray bg-white'>
          <main className='py-12'>
            <p className='text-center font-normal text-[0.9375rem] leading-[1.375rem] -tracking-[0.01rem]'>
              모임을 정말 없애시겠습니까?
            </p>
          </main>
          <hr className='border-t-gray' />
          <footer>
            <ul className='w-full flex items-center'>
              <li className='w-full h-nav border-r border-r-gray'>
                <button
                  className='w-full h-full'
                  onClick={() => setOpen(false)}>
                  취소
                </button>
              </li>
              <li className='w-full h-nav'>
                <button className='w-full h-full' onClick={onRemoveClub}>
                  확인
                </button>
              </li>
            </ul>
          </footer>
        </section>
      </Modal>
    </footer>
  );
}
