import Layout from '@/components/templates';
import Atoms from '../atoms';
import Icons from '../icons';
import Link from 'next/link';

export default function Profile() {
  return (
    <Layout.Nested>
      <section className='flex flex-col justify-center items-center gap-2.5 mt-[1.875rem]'>
        <div className='relative'>
          <Atoms.Avatar name='Mason' size={111} isAvailable={true} />
          <div className='absolute right-0 bottom-0 w-[2.375rem] h-[2.375rem]'>
            <button className='w-full h-full'>
              <Icons.Camera />
            </button>
          </div>
        </div>
        <h6 className='font-bold text-[1.25rem] leading-[1.875rem] text-[#222] -tracking-[0.01rem]'>
          윤태성
        </h6>
      </section>
      <section className='mt-[1.875rem]'>
        <ul className='flex flex-col items-center justify-center gap-2.5'>
          <li className='w-full h-16 max-w-[19.4375rem] border border-border-gray rounded-[0.3125rem]'>
            <Link href={'/'}>
              <a className='flex items-center w-full p-5'>
                <Icons.MyCrown />
                <span className='flex-1 pl-3 text-[0.9375rem] leading-[1.375rem] text-[#222] -tracking-[0.01rem]'>
                  내가 만든 모임
                </span>
                <Icons.Rarrow />
              </a>
            </Link>
          </li>
          <li className='w-full h-16 max-w-[19.4375rem] border border-border-gray rounded-[0.3125rem]'>
            <Link href={'/'}>
              <a className='flex items-center w-full p-5'>
                <Icons.MyJoin />
                <span className='flex-1 pl-3 text-[0.9375rem] leading-[1.375rem] text-[#222] -tracking-[0.01rem]'>
                  참여한 모임
                </span>
                <Icons.Rarrow />
              </a>
            </Link>
          </li>
          <li className='w-full h-16 max-w-[19.4375rem] border border-border-gray rounded-[0.3125rem]'>
            <Link href={'/'}>
              <a className='flex items-center w-full p-5'>
                <Icons.MyLike />
                <span className='flex-1 pl-3 text-[0.9375rem] leading-[1.375rem] text-[#222] -tracking-[0.01rem]'>
                  찜한 모임
                </span>
                <Icons.Rarrow />
              </a>
            </Link>
          </li>
        </ul>
      </section>
    </Layout.Nested>
  );
}
