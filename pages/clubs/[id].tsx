import Pages from '@/components/pages';
import Templates from '@/components/templates';
import useCategories from '@/hooks/useCategories';
import useClubDetail from '@/hooks/useClubDetail';
import useNavigationGuard from '@/hooks/useNavigationGuard';
import AuthService from '@/services/auth.service';
import ClubService from '@/services/club.service';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['auth'], AuthService.googleLogin);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

const Club: NextPage = () => {
  const { isLoading, isError } = useNavigationGuard();

  if (isLoading || isError) {
    return <></>;
  }

  return <Pages.ClubDetail />;
};

export default Club;
