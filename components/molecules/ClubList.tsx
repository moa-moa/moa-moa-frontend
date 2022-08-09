import { IClub } from '@/models/interfaces/data/Club';
import Molecules from '@/components/molecules';

interface Props {
  clubs: IClub[];
}

export default function ClubList({ clubs }: Props) {
  return (
    <ul className='flex flex-col gap-[0.625rem]'>
      {clubs.map((club) => {
        return <Molecules.ClubItem key={club.id} {...club} />;
      })}
    </ul>
  );
}
