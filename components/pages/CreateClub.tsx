import Layout from '@/components/templates/layouts';
import Organisms from '../organisms';
import { useForm } from 'react-hook-form';
import {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
  useRef,
  DragEvent,
  TouchEvent
} from 'react';
import Icons from '../atoms/icons';
import { isMobile } from 'react-device-detect';

interface NestedValues {
  title: string;
  description: string;
  max: number;
}

const defaultValues: NestedValues = {
  title: '',
  description: '',
  max: Infinity
};

export default function RenewClub() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({ defaultValues });
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

  const canUseDOM = !!(
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined'
  );
  const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    register('max', { required: true, min: 1, max: Infinity });
  }, []);

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

  const onSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);

  return (
    <Layout.RenewClub>
      <Organisms.TabCategories type='wrap' />
      <form onSubmit={handleSubmit(onSubmit)} className='px-4'>
        <section className='form-group mb-2.5'>
          <input
            type='text'
            className='border border-border-gray p-3.5 w-full text-base text-[#222222] rounded-[0.3125rem] focus:outline-none focus:bg-[#FDF4F6] focus:caret-[#ee2554]'
            {...register('title', { required: true })}
            placeholder='클럽 제목을 입력해주세요.'
          />
        </section>

        <section className='form-group mb-2.5 h-44'>
          <textarea
            className='border border-border-gray p-3.5 w-full resize-none h-full text-base text-[#222222] rounded-[0.3125rem] focus:outline-none focus:bg-[#FDF4F6] focus:caret-[#ee2554]'
            {...register('description', { required: true })}
            placeholder='클럽 부가 설명을 입력해주세요.'
          />
        </section>

        <section className='form-group flex justify-center items-center gap-2 mb-5'>
          <div className='flex-1 h-nav border border-border-gray rounded-[0.3125rem] text-gray'>
            <button
              type='button'
              className='w-full h-full flex justify-center items-center gap-[0.3125rem]'>
              <Icons.TCheckOff />
              <span className='text-base'>인원 제한 없음</span>
            </button>
          </div>
          <div className='flex-1 flex justify-center items-center h-nav text-base text-gray border border-border-gray rounded-[0.3125rem]'>
            <div>최대</div>
            <button type='button'>
              <Icons.TMinusOff />
            </button>
            <div>4명</div>
            <button type='button'>
              <Icons.TPlusOff />
            </button>
          </div>
        </section>

        <section className='form-group'>
          <div className='flex items-end mb-2.5'>
            <h6 className='text-sm font-bold mr-1'>사진 업로드</h6>
            <div className='text-xs text-gray leading-[1.2rem]'>
              (선택, 최대 10장) {dragged.current.desktop.doing}
            </div>
          </div>
          <div className='grid md:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-x-2 gap-y-2.5'>
            {Array.from({ length: 10 }, (_, index) => index + 1).map(
              (data, index, total) => (
                <section
                  key={data}
                  className='club-image w-full pb-[100%] h-0 bg-blue-500 rounded-[0.3125rem] relative flex justify-center items-center touch-none'
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
                    className='w-8 h-8 rounded-full bg-moa-pink flex justify-center items-center absolute -right-1 -top-2'>
                    <Icons.WClose />
                  </button>
                  <div>{index}</div>
                </section>
              )
            )}
          </div>
        </section>

        <section className='form-group fixed left-0 bottom-0 w-screen h-nav md:max-w-5xl md:mx-auto md:left-1/2 md:-translate-x-1/2'>
          <button
            type='submit'
            className='w-full h-full bg-disabled text-gray text-base'>
            등록
          </button>
        </section>
      </form>
    </Layout.RenewClub>
  );
}
