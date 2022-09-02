import useHover from '@/hooks/useHover';
import { ICategory } from '@/models/interfaces/data/Category';
import { Dispatch } from 'react';

interface Props {
  info: {
    id: number;
    name: string;
    num: number;
    selected: {
      category: ICategory;
      setCategory: Dispatch<ICategory>;
    };
  };
  style: { backColor: string };
}

export default function CategoryButton({
  info: { id, name, num, selected },
  style
}: Props) {
  const [hoverRef, isHovered] = useHover();
  const buttonText = `${name} (${num})`;
  const isSelected = id === selected.category.id;
  return (
    <button
      className='px-2.5 py-[0.3125rem] text-sm shrink-0 border border-[#dddddd] rounded-[0.3125rem]'
      style={{
        backgroundColor: isSelected ? style.backColor : '#fff',
        color: isSelected ? '#fff' : '#222222',
        fontWeight: isSelected ? 'bold' : 'normal',
        opacity: isHovered ? 0.7 : 1
      }}
      ref={hoverRef}
      onClick={() =>
        selected.setCategory({
          id: id,
          name: name,
          backColor: style.backColor
        })
      }>
      {buttonText}
    </button>
  );
}
