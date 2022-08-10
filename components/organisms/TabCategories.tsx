import {
  MouseEvent as ReactMouseEvent,
  useRef,
  useCallback,
  useLayoutEffect,
  useEffect
} from 'react';

interface Position {
  scrollLeft: number;
  clientX: number;
  scrollY: number;
}

interface Props {
  type?: 'slide' | 'wrap';
}

const position: Position = {
  scrollLeft: 0,
  clientX: 0,
  scrollY: 0
};

export default function TabCategories({ type }: Props) {
  const categories = [
    '전체(7)',
    '점심(3)',
    '스터디(2)',
    '공동구매(1)',
    '게임(1)',
    '술(0)',
    '문화생활(0)',
    '독서(0)',
    '기타(0)'
  ];
  const canUseDOM = !!(
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined'
  );
  const uiType = type || 'slide';
  const wrapStyle = uiType === 'slide' ? '' : ' flex-wrap';

  const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

  const scrollEl = useRef<HTMLUListElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    scrollEl.current?.addEventListener('wheel', onMouseWheel, {
      passive: false
    });

    return () => {
      scrollEl.current?.removeEventListener('wheel', onMouseWheel);
    };
  }, []);

  const onMouseDownHandler = useCallback((event: ReactMouseEvent) => {
    let waiting = false;
    return (function () {
      if (!waiting) {
        position['scrollLeft'] = scrollEl.current!.scrollLeft;
        position['clientX'] = event.clientX;

        document.addEventListener('mousemove', onMouseMoveHandler);
        document.addEventListener('mouseup', onMouseUpHandler);
        waiting = true;
        setTimeout(() => {
          waiting = false;
        }, 250);
      }
    })();
  }, []);

  const onMouseMoveHandler = useCallback((event: MouseEvent) => {
    const diff: number = event.clientX - position['clientX'];
    scrollEl.current!.scrollLeft = position.scrollLeft - diff;
  }, []);

  const onMouseUpHandler = useCallback(() => {
    document.removeEventListener('mousemove', onMouseMoveHandler);
    document.removeEventListener('mouseup', onMouseUpHandler);
  }, []);

  const onMouseWheel = useCallback((event: WheelEvent) => {
    let wheelingTimer: NodeJS.Timeout | null = null;

    event.preventDefault();

    return (function () {
      if (wheelingTimer === null) {
        position['scrollY'] = window.scrollY;
        window.addEventListener('scroll', noscroll);
      }

      const delta = event.deltaY;
      scrollEl.current!.scrollLeft += delta;

      clearTimeout(wheelingTimer!);
      wheelingTimer = setTimeout(() => {
        wheelingTimer = null;
        window.removeEventListener('scroll', noscroll);
      }, 250);
    })();
  }, []);

  const noscroll = function () {
    window.scrollTo(0, position['scrollY']);
    return false;
  };

  return (
    <nav id='navHeader' className='w-full mb-6'>
      <ul
        ref={scrollEl}
        className={
          'w-full flex gap-1.5 overflow-x-auto px-4 scrollbar-hide' + wrapStyle
        }
        onMouseDown={onMouseDownHandler}>
        {categories.map((category) => {
          return (
            <li key={category} className='shrink-0'>
              <button className='px-2.5 py-[0.3125rem] text-sm shrink-0 border border-[#dddddd] rounded-[0.3125rem]'>
                {category}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
