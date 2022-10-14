import AuthService from '@/services/auth.service';
import ClubService from '@/services/club.service';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { clubDetailStates } from 'store/clubDetail';
import useToasts from './useToasts';

export default function useClubDetail(clubId: number) {
  const setClubDetail = useSetRecoilState(clubDetailStates);
  const router = useRouter();
  const { addToast } = useToasts();

  const response = useQuery(['clubDetail', clubId], ClubService.getDetail, {
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 3000,
    keepPreviousData: true,
    enabled: !!AuthService.accessToken,
    onSuccess(data) {
      const newData = typeof data === 'string' ? null : data;
      setClubDetail(newData);
      if (!newData) {
        addToast('error', '존재하지 않는 모임입니다.');
        router.push('/');
      }
    }
  });

  return response;
}
