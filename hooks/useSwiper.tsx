import { useCallback, useRef, LegacyRef } from 'react';
import useIsomophicLayoutEffect from './useIsomophicLayoutEffect';

interface Position {
  scrollLeft: number;
  clientX: number;
  scrollY: number;
}

const position: Position = {
  scrollLeft: 0,
  clientX: 0,
  scrollY: 0
};

type UseSwiperType<T = any> = LegacyRef<T>;

interface Props {
  dependencies?: any[];
}

let isMoving = false;

export default function useSwiper(props?: Props): UseSwiperType<any> {
  const ref = useRef<HTMLElement | null>(null);
  const dependencies = props?.dependencies || [ref.current];

  useIsomophicLayoutEffect(() => {
    const node = ref.current;

    if (node) {
      node.addEventListener('wheel', onMouseWheel);
      node.addEventListener('mousedown', onMouseDown);
    }

    return () => {
      if (node) {
        node.removeEventListener('wheel', onMouseWheel);
        node.removeEventListener('mousedown', onMouseDown);
      }
    };
  }, [dependencies, ref.current]);

  const onMouseWheel = useCallback(
    (event: WheelEvent) => {
      let wheelingTimer: NodeJS.Timeout | null = null;

      event.preventDefault();

      return (function () {
        if (wheelingTimer === null) {
          position['scrollY'] = window.scrollY;
          window.addEventListener('scroll', noscroll);
        }

        const delta = event.deltaY;
        ref.current!.scrollLeft += delta;

        clearTimeout(wheelingTimer!);
        wheelingTimer = setTimeout(() => {
          wheelingTimer = null;
          window.removeEventListener('scroll', noscroll);
        }, 250);
      })();
    },
    [ref.current]
  );

  const noscroll = function () {
    window.scrollTo(0, position['scrollY']);
    return false;
  };

  const onMouseDown = useCallback(
    (event: MouseEvent) => {
      let waiting = false;

      return (function () {
        if (!waiting) {
          position['scrollLeft'] = ref.current!.scrollLeft;
          position['clientX'] = event.clientX;

          document.addEventListener('mousemove', onMousemove);
          document.addEventListener('mouseup', onMouseup);
          waiting = true;
          isMoving = true;

          setTimeout(() => {
            waiting = false;
          }, 250);
        }
      })();
    },
    [ref.current]
  );

  const onMousemove = useCallback(
    (event: MouseEvent) => {
      if (isMoving && ref.current) {
        const diff: number = event.clientX - position['clientX'];
        ref.current!.scrollLeft = position.scrollLeft - diff;
      }
    },
    [ref.current]
  );

  const onMouseup = useCallback(() => {
    document.removeEventListener('mousemove', onMouseDown);
    document.removeEventListener('mouseup', onMouseup);
    isMoving = false;
  }, [ref.current]);

  return ref;
}
