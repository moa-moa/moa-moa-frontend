import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import AuthService from '@/services/auth.service';
import useToasts from './useToasts';
import { useState } from 'react';

export default function useNavigationGuard() {
  const [first, setFirst] = useState(true);
  const router = useRouter();
  const { addToast } = useToasts();
  const response = useQuery(['auth'], AuthService.googleLogin, {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !AuthService.accessToken,
    onSuccess: (data) => {
      AuthService.setAccessToken(data.accessToken);
      AuthService.refreshLogin(response.refetch);
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
        }
      }
      router.replace('/login');
    }
  });

  return response;
}
