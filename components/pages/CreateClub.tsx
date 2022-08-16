import Layout from '@/components/templates/layouts';
import Organisms from '../organisms';
import { useForm } from 'react-hook-form';
import {
  useCallback,
  useLayoutEffect,
  useEffect,
  useRef,
  DragEvent
} from 'react';
import Icons from '../atoms/icons';

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

  const setDragSortableEvents = () => {
    // console.log(document.querySelectorAll('.club-image'));
    // console.log(document.querySelectorAll());
  };

  const onDragStart = useCallback((event: DragEvent) => {
    const currentTarget = event.currentTarget! as HTMLElement;
    const index = currentTarget.getAttribute('data-index');

    currentTarget.classList!.add('drag--moving');

    dragged.current.desktop.doing = true;
    dragged.current.desktop.el = currentTarget;
    dragged.current.desktop.index = index;
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

        const currentTarget = event.currentTarget!;
        const index = currentTarget.getAttribute('data-index');

        if (dragged.current.desktop.index !== index) {
          if (!currentTarget.className.includes('drag--hover')) {
            currentTarget.classList.add('drag--hover');
          }
        }

        setTimeout(() => {
          waiting = false;
        }, 250);
      }
    })();
  }, []);

  const onDragLeave = useCallback((event: DragEvent) => {
    if (!dragged.current.desktop.doing) {
      return;
    }

    const currentTarget = event.currentTarget!;
    if (currentTarget.className.includes('drag--hover')) {
      currentTarget.classList.remove('drag--hover');
    }
  }, []);

  const onDragEnd = useCallback((event: DragEvent) => {
    event.preventDefault();

    if (!dragged.current.desktop.doing) {
      return;
    }

    const images = document.querySelectorAll('.club-image');
    images.forEach((image) => {
      image.classList.remove('drag--hover');
      image.classList.remove('drag--moving');
    });

    dragged.current.desktop.doing = null;
    dragged.current.desktop.el = null;
    dragged.current.desktop.index = null;
  }, []);

  const onDrop = useCallback((event: DragEvent) => {
    if (!dragged.current.desktop.doing) {
      return;
    }

    const currentTarget = event.currentTarget!;
    const droppedIndex = Number(currentTarget.getAttribute('data-index'));
    const draggedIndex = Number(dragged.current.desktop.index!);
    const isLast = currentTarget.getAttribute('data-is-last-index');

    if (draggedIndex !== droppedIndex) {
      let originalPlace: HTMLElement | null = null;

      if (dragged.current.desktop.el.nextSibling) {
        originalPlace = dragged.current.desktop.el.nextSibling;
      } else {
        originalPlace = dragged.current.desktop.el.previousSibling;
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
              (선택, 최대 10장)
            </div>
          </div>
          <div className='grid md:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-x-2 gap-y-2.5'>
            {Array.from({ length: 10 }, (_, index) => index + 1).map(
              (data, index, total) => (
                <section
                  key={data}
                  className='club-image w-full pb-[100%] h-0 bg-blue-500 rounded-[0.3125rem] relative flex justify-center items-center'
                  draggable='true'
                  data-index={index}
                  data-is-last-index={index === total.length - 1}
                  onDragStart={onDragStart}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDragEnd={onDragEnd}
                  onDrop={onDrop}>
                  <button
                    type='button'
                    className='w-8 h-8 rounded-full bg-moa-pink flex justify-center items-center absolute -right-1 -top-2'>
                    <Icons.WClose />
                  </button>
                  <button
                    type='button'
                    className='w-8 h-8 rounded-full bg-gray flex justify-center items-center absolute right-7 -top-2'>
                    <Icons.Move />
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
