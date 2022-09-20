import { ClubFormValues } from '@/models/interfaces/props/ClubFormValues';
import { useCallback } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import Organisms from '.';
import Atoms from '../atoms';
import Molecules from '../molecules';

const defaultValues: ClubFormValues = {
  title: '',
  description: '',
  max: Infinity,
  images: []
};

export default function ClubForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState,
    formState: { errors, isValid }
  } = useForm({ defaultValues });

  const inputTitle = register('title', {
    required: true,
    validate: {
      empty: (v) => {
        return !!v;
      }
    }
  });
  const inputDescription = register('description', {
    required: true,
    validate: {
      empty: (v) => {
        return !!v;
      }
    }
  });
  const inputMax = register('max', { required: true, min: 1, max: Infinity });

  const inputImages = register('images', {
    required: false
  });

  const {
    fields: photos,
    append: addImage,
    remove: removeImage,
    swap: swapImage
  } = useFieldArray({
    control: control,
    name: 'images',
    rules: {
      minLength: 1
    }
  });

  const onSubmit = useCallback(
    (data: any) => {
      console.log(formState);
      console.log(control);
      console.log(isValid);
      console.log(errors);
      console.log(data);
    },
    [isValid]
  );

  return (
    <>
      <Organisms.TabCategories type='wrap' />
      <form onSubmit={handleSubmit(onSubmit)} className='px-4 pb-[3.75rem]'>
        <section className='form-group mb-2.5'>
          <Atoms.TitleInput ref={inputTitle.ref} setValue={setValue} />
        </section>

        <section className='form-group mb-2.5 h-44'>
          <Atoms.DescriptionTextArea
            ref={inputDescription.ref}
            setValue={setValue}
          />
        </section>

        <section className='form-group flex justify-center items-center gap-2 mb-5'>
          <Molecules.SelectMaxPeople
            getValues={getValues}
            setValue={setValue}
          />
        </section>

        <section className='form-group'>
          <Molecules.UploadPhotos
            photos={photos}
            inputImages={inputImages}
            addImage={addImage}
            removeImage={removeImage}
            swapImage={swapImage}
          />
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
    </>
  );
}
