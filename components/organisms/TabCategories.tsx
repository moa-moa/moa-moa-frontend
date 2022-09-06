import useSwiper from '@/hooks/useSwiper';
import { ICategory } from '@/models/interfaces/data/Category';
import CategoriesService from '@/services/categories.service';
import Atoms from '../atoms';

interface Props {
  type?: 'slide' | 'wrap';
  info: {
    data: ICategory[] | undefined;
    isLoading: boolean;
    isError: boolean;
  };
  options?: {
    withAllandEnd?: boolean;
    displayClubsNum?: boolean;
    selected?: {
      id: number;
      set: (id: number) => void;
    };
  };
}

export default function TabCategories({
  type,
  info: { data, isLoading, isError },
  options
}: Props) {
  const uiType = type || 'slide';
  const wrapStyle = uiType === 'slide' ? '' : ' flex-wrap';
  const ref = useSwiper({ dependencies: [data] });

  if (isLoading || isError) {
    const widths = [
      '4.0625rem',
      '4.0625rem',
      '4.8125rem',
      '5.625rem',
      '4.0625rem',
      '3.25rem',
      '5.625rem',
      '4.0625rem',
      '4.0625rem',
      '4.0625rem',
      '2.875rem'
    ];
    return (
      <nav id='navHeader' className='w-full mb-6'>
        <ul className='w-full flex gap-1.5 overflow-x-auto px-4 scrollbar-hide'>
          {widths.map((width, index) => (
            <li
              key={`skeleton-cate-${index}}`}
              className='skeleton shrink-0 h-8 rounded-[0.3125rem]'
              style={{ width: width }}></li>
          ))}
        </ul>
      </nav>
    );
  }

  const categories = options?.withAllandEnd
    ? CategoriesService.convertWithAllandEnd(data!)
    : data!;

  return (
    <nav id='navHeader' className='w-full mb-6'>
      <ul
        ref={ref}
        className={
          'w-full flex gap-1.5 overflow-x-auto px-4 scrollbar-hide' + wrapStyle
        }>
        {categories.map((category) => {
          return (
            <Atoms.CategoryButton
              key={`cate-${category.id}`}
              info={{
                id: category.id,
                name: category.name,
                num: 0,
                isActive: category.id === (options?.selected?.id ?? false),
                displayClubsNum: options?.displayClubsNum
              }}
              style={{ backColor: category.backColor }}
              onClick={() => options?.selected?.set(category.id)}
            />
          );
        })}
      </ul>
    </nav>
  );
}
