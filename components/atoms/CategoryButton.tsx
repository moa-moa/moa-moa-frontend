import useHover from '@/hooks/useHover';

interface Props {
  info: {
    id: number;
    name: string;
    num: number;
    isActive: boolean;
  };
  style: { backColor: string };
  onClick: () => void;
}

export default function CategoryButton({
  info: { name, num, isActive },
  style,
  onClick
}: Props) {
  const [hoverRef, isHovered] = useHover();
  const buttonText = `${name} (${num})`;
  return (
    <button
      className='px-2.5 py-[0.3125rem] text-sm shrink-0 border border-[#dddddd] rounded-[0.3125rem]'
      style={{
        backgroundColor: isActive ? style.backColor : '#fff',
        color: isActive ? '#fff' : '#222222',
        fontWeight: isActive ? 'bold' : 'normal',
        opacity: isHovered ? 0.7 : 1
      }}
      ref={hoverRef}
      onClick={onClick}>
      {buttonText}
    </button>
  );
}
