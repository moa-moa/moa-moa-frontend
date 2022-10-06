import { ClubFormValues } from '@/models/interfaces/props/ClubFormValues';
import React from 'react';
import { UseFormSetValue } from 'react-hook-form';

export default React.forwardRef<
  HTMLInputElement,
  { setValue: UseFormSetValue<ClubFormValues> }
>(function TitleInput({ setValue }, ref) {
  return (
    <input
      type='text'
      className='border border-border-gray p-3.5 w-full text-base text-[#222222] rounded-[0.3125rem] focus:outline-none focus:bg-[#FDF4F6] focus:caret-[#ee2554]'
      placeholder='클럽 제목을 입력해주세요.'
      ref={ref}
      onChange={(e) => {
        const value = e.target.value;
        setValue('title', value, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        });
      }}
    />
  );
});
