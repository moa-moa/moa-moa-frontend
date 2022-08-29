import React from 'react';
import Layout from '@/components/templates/layouts';
import Organisms from '../organisms';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  useState,
  useCallback,
  useRef,
  DragEvent,
  TouchEvent,
  ChangeEvent,
  MouseEvent
} from 'react';
import Icons from '../atoms/icons';
import { isMobile } from 'react-device-detect';
import useIsomorphicLayoutEffect from '@/hooks/useIsomophicLayoutEffect';
import usePrevious from '@/hooks/usePrevious';

interface NestedValues {
  title: string;
  description: string;
  max: number;
  images: { value: string }[];
}

const defaultValues: NestedValues = {
  title: '',
  description: '',
  max: Infinity,
  images: []
};

export default function RenewClub() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors, isValid }
  } = useForm({ defaultValues });
  const { ref: fileRef, ...fileRest } = register('images', {
    required: true
  });
  const {
    fields: photos,
    append: addImage,
    remove: removeImage
  } = useFieldArray({
    control: control,
    name: 'images',
    rules: {
      minLength: 1
    }
  });
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
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const isMaxInfinity = getValues('max') === Infinity;
  const previousMax = usePrevious(getValues('max'), {
    preventUpdate: isMaxInfinity,
    initialValue: 4
  });

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

  const onUpload = useCallback(() => {
    if (uploadRef) {
      uploadRef.current!.value = '';
      uploadRef.current!.click();
    }
  }, []);

  const onFileChange = useCallback(async (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length) {
      const promises: Promise<string>[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        const promise: Promise<string> = new Promise((resolve, reject) => {
          reader.onload = (e: ProgressEvent<FileReader>) => {
            const target = e.target!;
            const { result } = target;
            resolve(result as string);
          };
        });
        promises.push(promise);
        reader.readAsDataURL(file);
      }

      const resultFromPromiseSettled = await Promise.allSettled(promises);
      const previews: PromiseSettledResult<string>[] =
        resultFromPromiseSettled.filter((p) => p.status === 'fulfilled');

      for (let i = 0; i < previews.length; i++) {
        const preview = previews[i] as PromiseFulfilledResult<string>;
        const value = preview.value;
        addImage({ value });
      }
    }
  }, []);

  const onDeletePhoto = useCallback((event: MouseEvent, index: number) => {
    if (event.stopPropagation) {
      event.stopPropagation();
    }

    removeImage(index);
  }, []);

  const onResetMax = useCallback(() => {
    const newValue = isMaxInfinity ? previousMax : getValues('max');
    setValue('max', newValue, {
      shouldValidate: true,
      shouldDirty: true
    });
  }, [getValues('max')]);

  const onPlusMax = useCallback(() => {
    const newValue = isMaxInfinity ? previousMax : getValues('max');
    setValue('max', newValue + 1, {
      shouldValidate: true,
      shouldDirty: true
    });
  }, [getValues('max')]);

  const onMinusMax = useCallback(() => {
    const newValue = isMaxInfinity ? previousMax : getValues('max');

    if (newValue > 2) {
      setValue('max', newValue - 1, {
        shouldValidate: true,
        shouldDirty: true
      });
      return;
    }

    setValue('max', 2, {
      shouldValidate: true,
      shouldDirty: true
    });
  }, [getValues('max')]);

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
          <div className='flex-1 h-nav'>
            <button
              type='button'
              className='w-full h-full flex justify-center items-center gap-[0.3125rem] border rounded-[0.3125rem]'
              style={{
                borderColor: isMaxInfinity ? '#ee2554' : '#ddd'
              }}
              onClick={() => {
                setValue('max', Infinity, {
                  shouldValidate: true
                });
              }}>
              {isMaxInfinity ? <Icons.TCheckOn /> : <Icons.TCheckOff />}
              <span
                className='text-base'
                style={{
                  color: isMaxInfinity ? '#ee2554' : '#999'
                }}>
                인원 제한 없음
              </span>
            </button>
          </div>
          <div
            className='flex-1 flex justify-center items-center h-nav text-base text-gray border border-border-gray rounded-[0.3125rem]'
            style={{
              borderColor: !isMaxInfinity ? '#ee2554' : '#ddd',
              color: !isMaxInfinity ? '#ee2554' : '#999'
            }}>
            <div>최대</div>
            <button type='button' onClick={onMinusMax}>
              {!isMaxInfinity ? <Icons.TMinusOn /> : <Icons.TMinusOff />}
            </button>
            <button type='button' onClick={onResetMax}>
              {isMaxInfinity ? previousMax : getValues('max')}명
            </button>
            <button type='button' onClick={onPlusMax}>
              {!isMaxInfinity ? <Icons.TPlusOn /> : <Icons.TPlusOff />}
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
            <section className='w-full h-0 pb-[100%] rounded-[0.3125rem] border border-[#ddd] relative'>
              <div
                className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full h-full flex justify-center items-center cursor-pointer'
                onClick={onUpload}>
                <Icons.Photo />
              </div>
              <input
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                multiple
                {...fileRest}
                ref={(e) => {
                  fileRef(e);
                  uploadRef.current = e;
                }}
                onChange={onFileChange}
              />
            </section>
            {photos.map(({ value }, index, total) => (
              <section
                key={`image-${index}`}
                className='club-image w-full pb-[100%] h-0 bg-blue-500 rounded-[0.3125rem] relative flex justify-center items-center touch-none'
                style={{
                  backgroundImage: `url("${value}")`,
                  backgroundPosition: 'center center',
                  backgroundSize: 'covoer'
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
          </div>
        </section>

        <section className='form-group fixed left-0 bottom-0 w-screen h-nav md:max-w-5xl md:mx-auto md:left-1/2 md:-translate-x-1/2'>
          <button
            type='submit'
            className='w-full h-full bg-disabled text-base'
            disabled={!isValid}
            style={{
              backgroundColor: isValid ? '#ee2554' : '#EEEEEE',
              color: isValid ? '#fff' : '#AAAAAA'
            }}>
            등록
          </button>
        </section>
      </form>
    </Layout.RenewClub>
  );
}
