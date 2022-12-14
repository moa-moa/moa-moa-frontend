import type { NextPage } from 'next';
import Pages from '@/components/pages';
import AuthService from '@/services/auth.service';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import useNavigationGuard from '@/hooks/useNavigationGuard';

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['auth'], AuthService.googleLogin);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

const Home: NextPage = () => {
  const { isLoading, isError } = useNavigationGuard();

  if (isLoading || isError) {
    return <></>;
  }

  return <Pages.Home />;
};

export default Home;
