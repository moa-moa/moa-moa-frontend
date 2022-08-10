import Layout from '@/components/templates/layouts';
import Organisms from '../organisms';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';

export default function RenewClub() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = useCallback(() => {
    console.log('on Submit');
  }, []);

  return (
    <Layout.RenewClub>
      <Organisms.TabCategories type='wrap' />
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className='form-group'>
          <input
            type='text'
            className='border border-border-gray p-3.5 w-full text-base text-[#222222] rounded-[0.3125rem] focus:outline-none focus:bg-[#FDF4F6] focus:caret-[#ee2554]'
            {...register('title')}
            placeholder='클럽 제목을 입력해주세요.'
          />
        </section>

        <section className='form-group'>
          <textarea
            className='border border-border-gray p-3.5 w-full resize-none h-44 text-base text-[#222222] rounded-[0.3125rem] focus:outline-none focus:bg-[#FDF4F6] focus:caret-[#ee2554]'
            {...register('description')}
            placeholder='클럽 부가 설명을 입력해주세요.'
          />
        </section>

        <section className='form-group'>
          <div>
            <button type='button'>인원 제한 없음</button>
          </div>
          <div>
            <div>최대</div>
            <button type='button'>마이너스</button>
            <div>명</div>
            <button type='button'>플러스</button>
          </div>
        </section>

        <section className='form-group'>
          <div>
            <h6>사진 업로드</h6>
            <div>(선택, 최대 10장)</div>
          </div>
          <div>
            <section></section>
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
