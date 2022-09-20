import { ClubFormValues } from '@/models/interfaces/props/ClubFormValues';
import { UseFormSetValue } from 'react-hook-form';
import Icons from '../icons';

interface Props {
  isMaxInfinity: boolean;
  setValue: UseFormSetValue<ClubFormValues>;
}

export default function SelectInfinityButton({
  isMaxInfinity,
  setValue
}: Props) {
  return (
    <div className='flex-1 h-nav'>
      <button
        type='button'
        className='w-full h-full flex justify-center items-center gap-[0.3125rem] border rounded-[0.3125rem]'
        style={{
          borderColor: isMaxInfinity ? '#ee2554' : '#ddd'
        }}
        onClick={() => {
          setValue('max', Infinity, {
            shouldValidate: true
          });
        }}>
        {isMaxInfinity ? <Icons.TCheckOn /> : <Icons.TCheckOff />}
        <span
          className='text-base'
          style={{
            color: isMaxInfinity ? '#ee2554' : '#999'
          }}>
          인원 제한 없음
        </span>
      </button>
    </div>
  );
}
