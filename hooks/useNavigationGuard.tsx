import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import AuthService from '@/services/auth.service';
import useToasts from './useToasts';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from 'store/user';

export default function useNavigationGuard() {
  const [first, setFirst] = useState(true);
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  const { addToast } = useToasts();
  const response = useQuery(['auth'], AuthService.googleLogin, {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !AuthService.accessToken,
    onSuccess: ({ tokenInfo, userInfo }) => {
      AuthService.setAccessToken(tokenInfo.accessToken);
      AuthService.refreshLogin(response.refetch);
      setUser(userInfo);
      if (first) {
        addToast('success', '모아모아에 접속하신 것을 환영합니다.');
        setFirst(false);
      }
    },
    onError: async (error: { status: number; message: string }) => {
      const status = error.status;
      if (status === 401) {
        if (AuthService.accessToken) {
          await AuthService.logout();
          setUser(null);
        }
      }
      router.replace('/login');
    }
  });

  return response;
}
