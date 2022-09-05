import Link from 'next/link';
import Icons from '../icons';

export default function LoginButton() {
  return (
    <Link href='/moamoa/auth/google'>
      <a className='flex items-center justify-center gap-[0.6875rem] w-full max-w-[19.4375rem] h-16 border border-gray cursor-pointer rounded-[0.3125rem]'>
        <span className='block w-6 h-6'>
          <Icons.Google />
        </span>
        <span className='text-[0.9375rem] text-[#222222] -tracking-[-0.01rem]'>
          골라라 구글 계정으로 로그인
        </span>
      </a>
    </Link>
  );
}
