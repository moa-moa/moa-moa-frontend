import useCategories from '@/hooks/useCategories';
import useSwiper from '@/hooks/useSwiper';
import Atoms from '../atoms';

interface Props {
  type?: 'slide' | 'wrap';
}

export default function TabCategories({ type }: Props) {
  const uiType = type || 'slide';
  const wrapStyle = uiType === 'slide' ? '' : ' flex-wrap';
  const { data, isLoading, isError } = useCategories();
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

  const allCategory = { id: -1, name: '전체', backColor: '#333333' };
  const endCategory = { id: -2, name: '종료', backColor: '#777777' };
  const categories = [allCategory, ...data, endCategory];

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
              info={{ name: category.name, type: '' + category.id, num: 0 }}
              style={{ backColor: category.backColor }}
            />
          );
        })}
      </ul>
    </nav>
  );
}
