import { BadgeType } from '@/models/types/UI/badge';
import Icons from './icons';

export default function Badge({ type, backColor, text }: BadgeType) {
  if (type === 'person') {
    return (
      <span
        className={
          'flex items-center px-[0.3125rem] py-0.5 text-white rounded-[0.3125rem] text-sm'
        }
        style={{ backgroundColor: backColor }}>
        <Icons.Crown />
        {text}
      </span>
    );
  }

  return (
    <span
      className={'px-[0.3125rem] py-0.5 text-white rounded-[0.3125rem] text-sm'}
      style={{ backgroundColor: backColor }}>
      {text}
    </span>
  );
}
