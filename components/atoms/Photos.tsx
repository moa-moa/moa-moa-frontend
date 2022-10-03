import { IPhoto } from '@/models/interfaces/data/Photo';
import React, {
  DragEvent,
  MouseEvent,
  TouchEvent,
  useCallback,
  useRef,
  useState
} from 'react';
import Icons from '../icons';
import { isMobile } from 'react-device-detect';
import { UseFieldArraySwap } from 'react-hook-form';

interface Props {
  photos: IPhoto[];
  swapImage: UseFieldArraySwap;
  onDeletePhoto: (e: MouseEvent, index: number) => void;
}

export default function Photos({ photos, onDeletePhoto, swapImage }: Props) {
  const [draggable, setDraggable] = useState(false);
  const dragged: any = useRef({
    desktop: {
      doing: false,
      el: null,
      index: null
    },
    mobile: {
      doing: false,
      el: null,
      index: null
    }
  });

  const onMouseDown = useCallback(() => {
    if (isMobile) {
      return;
    }
    dragged.current.desktop.doing = true;
    setDraggable(true);
  }, []);

  const onTouchStart = useCallback((event: TouchEvent) => {
    const currentTarget = event.currentTarget.parentNode! as HTMLElement;
    const index = getIndexFromImages(currentTarget);

    currentTarget.classList.add('drag--moving');

    dragged.current.mobile.doing = true;
    dragged.current.mobile.el = currentTarget;
    dragged.current.mobile.index = index;
  }, []);

  const onTouchMove = useCallback((event: TouchEvent) => {
    let waiting = false;

    return (function () {
      if (!waiting) {
        waiting = true;

        if (dragged.current.mobile.doing) {
          const { clientX, clientY } = event.changedTouches[0];
          const currentTarget = (
            document.elementFromPoint(clientX, clientY) as HTMLElement
          ).closest('.club-image') as HTMLElement;

          if (currentTarget) {
            const index = getIndexFromImages(currentTarget);
            const draggedIndex = dragged.current.mobile.index;

            removeClassFromImages('drag--hover');

            if (index !== draggedIndex) {
              if (!currentTarget.className.includes('drag--hover')) {
                currentTarget.classList.add('drag--hover');
              }
            }
          }
        }
      }

      setTimeout(() => {
        waiting = false;
      }, 250);
    })();
  }, []);

  const onTouchEnd = useCallback((event: TouchEvent) => {
    if (dragged.current.mobile.doing) {
      const { clientX, clientY } = event.changedTouches[0];
      const currentTarget = (
        document.elementFromPoint(clientX, clientY) as HTMLElement
      ).closest('.club-image') as HTMLElement;

      if (currentTarget) {
        const droppedIndex = getIndexFromImages(currentTarget);
        const draggedIndex = Number(dragged.current.mobile.index!);
        let isLast = false;

        if (draggedIndex !== droppedIndex) {
          let originalPlace: HTMLElement | null = null;

          if (dragged.current.mobile.el.nextSibling) {
            originalPlace = dragged.current.mobile.el.nextSibling;
          } else {
            originalPlace = dragged.current.mobile.el.previousSibling;
            isLast = true;
          }

          if (draggedIndex > droppedIndex) {
            currentTarget.before(dragged.current.mobile.el);
          } else {
            currentTarget.after(dragged.current.mobile.el);
          }

          if (isLast) {
            originalPlace!.after(currentTarget);
          } else {
            originalPlace!.before(currentTarget);
          }

          swapImage(draggedIndex, droppedIndex);
        }
      }

      removeClassFromImages('all');

      dragged.current.mobile.doing = false;
    }
  }, []);

  const onTouchCancel = useCallback((event: TouchEvent) => {
    let waiting = false;

    return (function () {
      if (!waiting) {
        waiting = true;

        const { clientX, clientY } = event.changedTouches[0];
        const currentTarget = (
          document.elementFromPoint(clientX, clientY) as HTMLElement
        ).closest('.club-image');

        if (currentTarget) {
          if (currentTarget.className.includes('drag--hover')) {
            currentTarget.classList.remove('drag--hover');
          }
        }
      }
      setTimeout(() => {
        waiting = false;
      }, 250);
    })();
  }, []);

  const onDragStart = useCallback((event: DragEvent) => {
    if (dragged.current.desktop.doing) {
      const currentTarget = event.currentTarget! as HTMLElement;
      const index = getIndexFromImages(currentTarget);

      currentTarget.classList!.add('drag--moving');

      dragged.current.desktop.el = currentTarget;
      dragged.current.desktop.index = index;
    }
  }, []);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();

    if (!dragged.current.desktop.doing) {
      return;
    }

    let waiting = false;

    return (function () {
      if (!waiting) {
        waiting = true;

        const targetFromPoint = document.elementFromPoint(
          event.clientX,
          event.clientY
        ) as HTMLElement;
        const currentTarget = targetFromPoint.closest('.club-image');

        if (currentTarget) {
          const index = getIndexFromImages(currentTarget as HTMLElement);

          if (dragged.current.desktop.index !== index) {
            if (!currentTarget.className.includes('drag--hover')) {
              removeClassFromImages('drag--hover');

              currentTarget.classList.add('drag--hover');
            }
          }
        }
      }

      setTimeout(() => {
        waiting = false;
      }, 250);
    })();
  }, []);

  const onDragEnd = useCallback((event: DragEvent) => {
    event.preventDefault();

    if (!dragged.current.desktop.doing) {
      return;
    }

    removeClassFromImages('all');

    dragged.current.desktop.doing = null;
    dragged.current.desktop.el = null;
    dragged.current.desktop.index = null;

    setDraggable(false);
  }, []);

  const onDrop = useCallback((event: DragEvent) => {
    if (!dragged.current.desktop.doing) {
      return;
    }
    if (event.stopPropagation) {
      event.stopPropagation();
    }

    const currentTarget = event.currentTarget! as HTMLElement;
    const droppedIndex = getIndexFromImages(currentTarget);
    const draggedIndex = Number(dragged.current.desktop.index!);
    let isLast = false;

    if (draggedIndex !== droppedIndex) {
      let originalPlace: HTMLElement | null = null;

      if (dragged.current.desktop.el.nextSibling) {
        originalPlace = dragged.current.desktop.el.nextSibling;
      } else {
        originalPlace = dragged.current.desktop.el.previousSibling;
        isLast = true;
      }

      if (draggedIndex > droppedIndex) {
        currentTarget.before(dragged.current.desktop.el);
      } else {
        currentTarget.after(dragged.current.desktop.el);
      }

      if (isLast) {
        originalPlace!.after(currentTarget);
      } else {
        originalPlace!.before(currentTarget);
      }

      swapImage(draggedIndex, droppedIndex);
    }
  }, []);

  const getIndexFromImages = useCallback((currentTarget: HTMLElement) => {
    const images = document.querySelectorAll('.club-image')!;
    return Array.from(images).indexOf(currentTarget);
  }, []);

  const removeClassFromImages = useCallback(
    (target: 'drag--hover' | 'drag--moving' | 'all') => {
      const images = document.querySelectorAll('.club-image');
      images.forEach((image) => {
        if (target === 'drag--hover') {
          image.classList.remove('drag--hover');
        } else {
          if (target === 'drag--moving') {
            image.classList.remove('drag--moving');
          } else {
            image.classList.remove('drag--hover');
            image.classList.remove('drag--moving');
          }
        }
      });
    },
    []
  );

  return (
    <>
      {photos.map(({ id, imagePath }, index, total) => (
        <section
          key={id}
          className='club-image w-full pb-[100%] h-0 bg-blue-500 rounded-[0.3125rem] relative flex justify-center items-center touch-none'
          style={{
            backgroundImage: `url("${process.env.NEXT_PUBLIC_BASE_URL}/${imagePath}")`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
          }}
          draggable={draggable}
          data-is-last-index={index === total.length - 1}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
          onDrop={onDrop}
          onTouchMove={onTouchMove}
          onTouchCancel={onTouchCancel}
          onTouchEnd={onTouchEnd}>
          <button
            type='button'
            className='w-8 h-8 rounded-full bg-gray flex justify-center items-center absolute right-7 -top-2'
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}>
            <Icons.Move />
          </button>
          <button
            type='button'
            className='w-8 h-8 rounded-full bg-moa-pink flex justify-center items-center absolute -right-1 -top-2'
            onClick={(e) => onDeletePhoto(e, index)}>
            <Icons.WClose />
          </button>
        </section>
      ))}
    </>
  );
}
