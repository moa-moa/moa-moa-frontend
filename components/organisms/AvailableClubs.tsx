import Molecules from '../molecules';
import { IClub } from '@/models/interfaces/data/Club';

export default function AvailableClubs() {
  const clubs = getClubs();
  return (
    <section className='mb-10'>
      <Molecules.ClubList clubs={clubs} />
    </section>
  );
}

function getClubs(): IClub[] {
  return [
    {
      id: 1,
      title: '오늘(8/24) 점심 마라탕 드실분~~~~!',
      owner: 'Mason',
      isAvailable: true,
      max: 4,
      category: {
        id: 1,
        name: '점심',
        backColor: '#F178B6'
      },
      userJoinedClub: [
        {
          id: 2,
          email: 'cheonyulin@gamil.com',
          name: 'Summer'
        },
        {
          id: 3,
          email: 'cheonyulin@gamil.com',
          name: '박보영',
          image: '/images/avatar.png'
        }
      ]
    },
    {
      id: 2,
      title: '이번주 내내 6천원 한식 뷔페 파티원 모집',
      owner: 'Summer',
      isAvailable: true,
      max: 4,
      category: {
        id: 1,
        name: '점심',
        backColor: '#F178B6'
      },
      userJoinedClub: [
        {
          id: 1,
          email: 'cheonyulin@gamil.com',
          name: 'Mason'
        },
        {
          id: 2,
          email: 'cheonyulin@gamil.com',
          name: '박보영',
          image: '/images/avatar.png'
        }
      ]
    },
    {
      id: 3,
      title: '점심식사 명동교자로 갈껀데 같이 가실 2분 모집',
      owner: 'Zora',
      isAvailable: true,
      max: 4,
      category: {
        id: 1,
        name: '점심',
        backColor: '#F178B6'
      },
      userJoinedClub: [
        {
          id: 1,
          email: 'cheonyulin@gamil.com',
          name: '윤태성'
        }
      ]
    }
  ];
}
