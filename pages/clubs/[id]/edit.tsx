import Pages from '@/components/pages';
import useNavigationGuard from '@/hooks/useNavigationGuard';
import AuthService from '@/services/auth.service';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { NextPage } from 'next';

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['auth'], AuthService.googleLogin);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

const EditClub: NextPage = () => {
  const { isLoading, isError } = useNavigationGuard();

  if (isLoading || isError) {
    return <></>;
  }

  return <section>hello</section>;
};

export default EditClub;
