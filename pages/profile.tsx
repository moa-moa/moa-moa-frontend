import type { NextPage } from 'next';
import Pages from '@/components/pages';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import AuthService from '@/services/auth.service';
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

const Profile: NextPage = () => {
  const response = useNavigationGuard();

  return <Pages.Profile />;
};

export default Profile;
