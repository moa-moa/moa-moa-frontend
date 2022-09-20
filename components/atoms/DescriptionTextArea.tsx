import { ClubFormValues } from '@/models/interfaces/props/ClubFormValues';
import React from 'react';
import { UseFormSetValue } from 'react-hook-form';

export default React.forwardRef<
  HTMLTextAreaElement,
  { setValue: UseFormSetValue<ClubFormValues> }
>(function DescriptionTextArea({ setValue }, ref) {
  return (
    <textarea
      className='border border-border-gray p-3.5 w-full resize-none h-full text-base text-[#222222] rounded-[0.3125rem] focus:outline-none focus:bg-[#FDF4F6] focus:caret-[#ee2554]'
      placeholder='클럽 부가 설명을 입력해주세요.'
      ref={ref}
      onChange={(e) => {
        const value = e.target.value;
        setValue('description', value, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        });
      }}
    />
  );
});
