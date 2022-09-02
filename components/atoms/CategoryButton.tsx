import useHover from '@/hooks/useHover';

interface Props {
  info: {
    type: string;
    name: string;
    num: number;
  };
  style: { backColor: string };
}

export default function CategoryButton({ info: { name, num }, style }: Props) {
  // const ref = useRef(null);
  const [hoverRef, isHovered] = useHover();
  const buttonText = `${name} (${num})`;
  return (
    <button
      className='px-2.5 py-[0.3125rem] text-sm shrink-0 border border-[#dddddd] rounded-[0.3125rem]'
      style={{
        backgroundColor: isHovered ? style.backColor : '#fff',
        color: isHovered ? '#fff' : '#222222',
        fontWeight: isHovered ? 'bold' : 'normal'
      }}
      ref={hoverRef}>
      {buttonText}
    </button>
  );
}
