import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { clubDetailStates } from 'store/clubDetail';
import { userState } from 'store/user';

export default function DetailFooter() {
  const userInfo = useRecoilValue(userState)!;
  const { owner, UserJoinedClub } = useRecoilValue(clubDetailStates)!;

  const isOwner = useMemo(() => {
    return userInfo.id === owner;
  }, [owner, userInfo]);

  const isJoined = useMemo(() => {
    return !!UserJoinedClub.find(({ User }) => User.id === userInfo.id);
  }, [userInfo, UserJoinedClub]);

  return (
    <footer className='fixed left-0 bottom-0 w-full h-nav'>
      <section className='max-w-5xl w-full h-full mx-auto'>
        {isOwner ? (
          <button className='w-full h-full bg-[#222222] text-white text-[1rem] leading-6 font-normal -tracking-[0.01rem]'>
            모임 폭파하기
          </button>
        ) : isJoined ? (
          <button className='w-full h-full bg-[#222222] text-white text-[1rem] leading-6 font-normal -tracking-[0.01rem]'>
            모임 나갈게요
          </button>
        ) : (
          <button className='w-full h-full bg-moa-pink text-white text-[1rem] leading-6 font-normal -tracking-[0.01rem]'>
            참여할래요
          </button>
        )}
      </section>
    </footer>
  );
}
