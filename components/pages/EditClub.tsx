import React, { useMemo } from 'react';
import Layout from '@/components/templates';
import Organisms from '../organisms';
import { useRouter } from 'next/router';
import useCategories from '@/hooks/useCategories';
import useClubDetail from '@/hooks/useClubDetail';
import useSwiper from '@/hooks/useSwiper';
import { ClubFormValues } from '@/models/interfaces/props/ClubFormValues';
import { IPhoto } from '@/models/interfaces/data/Photo';

export default function EditClub() {
  const { query } = useRouter();
  const clubId = query?.id ? Number(query?.id) : -1;

  const categories = useCategories();
  const clubDetail = useClubDetail(clubId);

  const ref = useSwiper({ dependencies: [clubDetail] });

  if (
    categories.isLoading ||
    clubDetail.isLoading ||
    typeof clubDetail.data === 'string'
  ) {
    return <section></section>;
  }

  const initialValues = useMemo<ClubFormValues | undefined>(() => {
    if (!clubDetail.data || typeof clubDetail.data === 'string') {
      return;
    }

    const {
      categoryId,
      title,
      description,
      max,
      ClubImage: clubImages
    } = clubDetail.data;

    const images: IPhoto[] = (clubImages || []).map((data) => {
      const { id, imagePath } = data.Image;
      return { id, imagePath };
    });

    return {
      category: categoryId,
      title: title || '',
      description: description || '',
      max: max >= 300 ? Infinity : max,
      images: images
    };
  }, [clubDetail.data]);

  return (
    <Layout.RenewClub>
      <Organisms.ClubForm initialValues={initialValues} />
    </Layout.RenewClub>
  );
}
