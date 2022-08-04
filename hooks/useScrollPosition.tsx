import { useLayoutEffect, useState } from 'react';

interface ScrollPosition {
  scrollX: number;
  scrollY: number;
}

let timer: any = null;
const INITIAL_STATE = {
  scrollX: 0,
  scrollY: 0
};

export function useScrollPosition(): ScrollPosition {
  if (typeof window === 'undefined') {
    return INITIAL_STATE;
  }

  const [scroll, setScroll] = useState<ScrollPosition>(INITIAL_STATE);

  const onScrolling = () => {
    if (!timer) {
      timer = setTimeout(() => {
        setScroll(() => {
          return {
            scrollX: window.scrollX,
            scrollY: window.scrollY
          };
        });
        timer = null;
      }, 200);
    }
  };

  useLayoutEffect(() => {
    window.addEventListener('scroll', onScrolling);
    return () => {
      window.removeEventListener('scroll', onScrolling);
    };
  });

  return scroll;
}
