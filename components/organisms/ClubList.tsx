import ClubService from '@/services/club.service';
import { useQuery } from '@tanstack/react-query';
import Molecules from '../molecules';

export default function ClubList() {
  const { isLoading, isError, data } = useQuery(['clubList'], ClubService.get);

  if (isLoading || isError) {
    return <Skeleton />;
  }

  return (
    <ul>
      {data!.map((club) => (
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
