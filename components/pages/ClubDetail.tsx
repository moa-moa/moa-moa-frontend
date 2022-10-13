import useCategories from '@/hooks/useCategories';
import useClubDetail from '@/hooks/useClubDetail';
import { useRouter } from 'next/router';
import Templates from '../templates';

export default function ClubDetail() {
  const { query } = useRouter();
  const clubId = query?.id ? Number(query?.id) : -1;
  const categories = useCategories();
  const clubDetail = useClubDetail(clubId);

  if (categories.isLoading || clubDetail.isLoading) {
    return <section>Loading...</section>;
  }

  return (
    <Templates.ClubDetail>
      <section>
        <h1>club Detail</h1>
      </section>
    </Templates.ClubDetail>
  );
}
