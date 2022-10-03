import useToasts from '@/hooks/useToasts';
import { IClubBody } from '@/models/interfaces/data/Club';
import { ClubFormValues } from '@/models/interfaces/props/ClubFormValues';
import ClubService from '@/services/club.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { categoryStates } from 'store/categories';
import Organisms from '.';
import Atoms from '../atoms';
import Molecules from '../molecules';

interface Props {
  isModal?: boolean;
}

const defaultValues: ClubFormValues = {
  category: 0,
  title: '',
  description: '',
  max: Infinity,
  images: []
};

export default function ClubForm({ isModal }: Props) {
  const router = useRouter();
  const categories = useRecoilValue(categoryStates);
  const { addToast } = useToasts();
  const createClub = useMutation(ClubService.create, {
    cacheTime: 0,
    retry: false,
    onSuccess: () => {
      // To Do: create Toast Navigation
      addToast('success', '클럽 생성이 완료되었습니다.');
      router.push('/');
    },
    onError: (error) => {
      console.log('클럽 생성 실패!');
      console.log(error);
    }
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors, isValid }
  } = useForm({ defaultValues });

  const inputCategory = register('category', {
    required: true,
    validate: {
      isValid: (v) => {
        if (categories) {
          return !!categories.find(({ id }) => id === v);
        }
        return false;
      }
    }
  });

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
    (data: ClubFormValues) => {
      const body: IClubBody = {
        categoryId: data.category,
        title: data.title,
        description: data.description,
        max: data.max,
        imageIds: data.images.map((image) => image.id)
      };
      createClub.mutate(body);
    },
    [isValid]
  );

  return (
    <>
      {createClub.isLoading && (
        <Atoms.Loading message={'클럽 생성중입니다. 잠시만 기다려주세요.'} />
      )}
      <Organisms.TabCategories
        type='wrap'
        info={{ data: categories, isLoading: false, isError: false }}
        options={{
          displayClubsNum: false,
          selected: {
            id: getValues('category'),
            set: (id: number) => {
              setValue('category', id, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true
              });
            }
          }
        }}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`px-4 ${isModal ? '' : 'pb-[3.75rem]'}`}>
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

        <section
          className={`form-group ${
            isModal
              ? 'mt-5'
              : 'fixed left-0 bottom-0 md:max-w-5xl md:mx-auto md:left-1/2 md:-translate-x-1/2 w-screen'
          } h-nav`}>
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
