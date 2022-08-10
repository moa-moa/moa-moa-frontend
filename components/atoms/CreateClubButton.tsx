import Icons from './icons';
import Link from 'next/link';

export default function CreateClubButton() {
  return (
    <div className='fixed bottom-[86px] right-[16px]'>
      <Link href='/?cmd=create-club' as='/clubs/create'>
        <a className='w-16 h-16 flex flex-col justify-center items-center rounded-full bg-[#ee2554] shadow-[0px_0px_20px_rgba(0, 0, 0, 0.3)]'>
          <Icons.Plus />
          <span className='text-[10px] leading-[15px] text-white'>
            모임 등록
          </span>
        </a>
      </Link>
    </div>
  );
}
