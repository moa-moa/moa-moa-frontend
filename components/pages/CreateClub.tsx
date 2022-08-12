import Layout from '@/components/templates/layouts';
import Organisms from '../organisms';
import { useForm } from 'react-hook-form';
import { useCallback, useLayoutEffect, useEffect } from 'react';
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

  const canUseDOM = !!(
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined'
  );
  const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    register('max', { required: true, min: 1, max: Infinity });
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
            <section className='w-full pb-[100%] h-0 bg-blue-500 rounded-[0.3125rem]'></section>
            <section className='w-full pb-[100%] h-0 bg-blue-500 rounded-[0.3125rem]'></section>
            <section className='w-full pb-[100%] h-0 bg-blue-500 rounded-[0.3125rem]'></section>
            <section className='w-full pb-[100%] h-0 bg-blue-500 rounded-[0.3125rem]'></section>
            <section className='w-full pb-[100%] h-0 bg-blue-500 rounded-[0.3125rem]'></section>

            <section className='w-full pb-[100%] h-0 bg-blue-500 rounded-[0.3125rem]'></section>
            <section className='w-full pb-[100%] h-0 bg-blue-500 rounded-[0.3125rem]'></section>
            <section className='w-full pb-[100%] h-0 bg-blue-500 rounded-[0.3125rem]'></section>
            <section className='w-full pb-[100%] h-0 bg-blue-500 rounded-[0.3125rem]'></section>
            <section className='w-full pb-[100%] h-0 bg-blue-500 rounded-[0.3125rem]'></section>
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
