import { LegacyRef, useEffect, useRef, useState } from 'react';
type UseHoverType<T = any> = [LegacyRef<T>, boolean];

export default function useHover(): UseHoverType<any> {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const ref = useRef<HTMLElement | null>(null);
  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  useEffect(() => {
    const node = ref.current;

    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);
    }

    return () => {
      if (node) {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      }
    };
  }, [ref.current]);

  return [ref, isHovered];
}
