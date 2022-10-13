import AuthService from '@/services/auth.service';
import ClubService from '@/services/club.service';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { clubDetailStates } from 'store/clubDetail';

export default function useClubDetail(clubId: number) {
  const setClubDetail = useSetRecoilState(clubDetailStates);

  const response = useQuery(['clubDetail', clubId], ClubService.getDetail, {
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 3000,
    keepPreviousData: true,
    enabled: !!AuthService.accessToken,
    onSuccess(data) {
      setClubDetail(data);
    }
  });

  return response;
}
