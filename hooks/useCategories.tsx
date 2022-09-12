import AuthService from '@/services/auth.service';
import CategoriesService from '@/services/categories.service';
import { useQuery } from '@tanstack/react-query';

export default function useCategories() {
  const response = useQuery(['categories'], CategoriesService.getCategories, {
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 3000,
    keepPreviousData: true,
    enabled: !!AuthService.accessToken
  });

  return response;
}
