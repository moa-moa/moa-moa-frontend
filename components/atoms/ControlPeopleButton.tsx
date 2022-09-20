import { ClubFormValues } from '@/models/interfaces/props/ClubFormValues';
import { UseFormGetValues } from 'react-hook-form';
import Icons from '../icons';

interface Props {
  isMaxInfinity: boolean;
  previousMax: number;
  getValues: UseFormGetValues<ClubFormValues>;
  onPlusMax: () => void;
  onResetMax: () => void;
  onMinusMax: () => void;
}

export default function ControlPeopleButton({
  isMaxInfinity,
  previousMax,
  getValues,
  onPlusMax,
  onResetMax,
  onMinusMax
}: Props) {
  return (
    <div
      className='flex-1 flex justify-center items-center h-nav text-base text-gray border border-border-gray rounded-[0.3125rem]'
      style={{
        borderColor: !isMaxInfinity ? '#ee2554' : '#ddd',
        color: !isMaxInfinity ? '#ee2554' : '#999'
      }}>
      <div>최대</div>
      <button type='button' onClick={onMinusMax}>
        {!isMaxInfinity ? <Icons.TMinusOn /> : <Icons.TMinusOff />}
      </button>
      <button type='button' onClick={onResetMax}>
        {isMaxInfinity ? previousMax : getValues('max')}명
      </button>
      <button type='button' onClick={onPlusMax}>
        {!isMaxInfinity ? <Icons.TPlusOn /> : <Icons.TPlusOff />}
      </button>
    </div>
  );
}
