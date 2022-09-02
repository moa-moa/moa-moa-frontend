import AuthService from '@/services/auth.service';
import CategoriesService from '@/services/categories.service';
import { useQuery } from '@tanstack/react-query';

export default function useCategories() {
  const response = useQuery(['categories'], CategoriesService.getCategories, {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!AuthService.accessToken,
    onSuccess: (data) => {
      console.log('data!', data);
    }
  });

  return response;
}
