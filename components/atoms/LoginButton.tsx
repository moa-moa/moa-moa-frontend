import Icons from '../icons';

interface Props {
  onClick: () => void;
}

export default function LoginButton({ onClick }: Props) {
  return (
    <button
      className='flex items-center justify-center gap-[0.6875rem] w-full max-w-[19.4375rem] h-16 border border-gray cursor-pointer rounded-[0.3125rem]'
      onClick={() => onClick()}>
      <span className='block w-6 h-6'>
        <Icons.Google />
      </span>
      <span className='text-[0.9375rem] text-[#222222] -tracking-[-0.01rem]'>
        골라라 구글 계정으로 로그인
      </span>
    </button>
  );
}
