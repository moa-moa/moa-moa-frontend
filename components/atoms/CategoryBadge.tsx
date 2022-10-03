import { ICategory } from '@/models/interfaces/data/Category';
import Icons from '../icons';

export default function CategoryBadge({ backColor, name }: ICategory) {
  return (
    <span
      className={'px-[0.3125rem] py-0.5 text-white rounded-[0.3125rem] text-sm'}
      style={{ backgroundColor: backColor }}>
      {name}
    </span>
  );
}
