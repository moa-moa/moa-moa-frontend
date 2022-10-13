import Templates from '@/components/templates';
import useCategories from '@/hooks/useCategories';
import useClubDetail from '@/hooks/useClubDetail';
import useNavigationGuard from '@/hooks/useNavigationGuard';
import AuthService from '@/services/auth.service';
import ClubService from '@/services/club.service';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;
  const clubId = params?.id ? Number(params.id) : -1;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['auth'], AuthService.googleLogin);
  await queryClient.prefetchQuery(
    ['clubDetail', clubId],
    ClubService.getDetail
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

const Club: NextPage = () => {
  const { query } = useRouter();
  const clubId = query?.id ? Number(query?.id) : -1;

  const guard = useNavigationGuard();
  const categories = useCategories();
  const clubDetail = useClubDetail(clubId);

  if (categories.isLoading || clubDetail.isLoading) {
    return <section>Loading...</section>;
  }

  if (categories.isError || clubDetail.isError) {
    return <section>Error...</section>;
  }

  return (
    <Templates.ClubDetail>
      <section>
        <h1>club Detail</h1>
      </section>
    </Templates.ClubDetail>
  );
};

export default Club;
