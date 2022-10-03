import AuthService from '@/services/auth.service';
import CategoriesService from '@/services/categories.service';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { categoryStates } from 'store/categories';

export default function useCategories() {
  const setCategories = useSetRecoilState(categoryStates);

  const response = useQuery(['categories'], CategoriesService.getCategories, {
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 3000,
    keepPreviousData: true,
    enabled: !!AuthService.accessToken,
    onSuccess(data) {
      setCategories([...data]);
    }
  });

  return response;
}
