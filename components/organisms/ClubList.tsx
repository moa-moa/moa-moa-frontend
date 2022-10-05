import { IClub } from '@/models/interfaces/data/Club';
import { useMemo } from 'react';
import Molecules from '../molecules';

interface Props {
  clubs: IClub[];
  isLoading: boolean;
  isError: boolean;
  selectedCategoryId: number;
}

export default function ClubList({
  clubs,
  isLoading,
  isError,
  selectedCategoryId
}: Props) {
  if (isLoading || isError) {
    return <Skeleton />;
  }

  const clubList = useMemo(() => {
    if (selectedCategoryId > 0) {
      return clubs.filter((club) => club.categoryId === selectedCategoryId);
    }
    return clubs;
  }, [selectedCategoryId]);

  return (
    <ul className='flex flex-col gap-[0.625rem]'>
      {clubList!.map((club) => (
        <Molecules.ClubItem key={club.id} {...club} />
      ))}
    </ul>
  );
}

function Skeleton() {
  const list = Array.from({ length: 10 }, (_, i) => `skeleton-${i + 1}`);
  return (
    <ul className='flex flex-col gap-[0.625rem]'>
      {list.map((id) => (
        <li key={id} className='skeleton h-[5.5rem] rounded-[0.3125rem]'></li>
      ))}
    </ul>
  );
}
