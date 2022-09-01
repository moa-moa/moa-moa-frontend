import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import AuthService from '@/services/auth.service';

export default function useNavigationGuard() {
  const router = useRouter();
  const response = useQuery(['auth'], AuthService.googleLogin, {
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      AuthService.setAccessToken(data.accessToken);
    },
    onError: (error) => {
      router.replace('/login');
    }
  });

  return response;
}
