import useToasts from '@/hooks/useToasts';
import { IClub, IClubBody } from '@/models/interfaces/data/Club';
import { ClubFormValues } from '@/models/interfaces/props/ClubFormValues';
import ClubService from '@/services/club.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { categoryStates } from 'store/categories';
import Organisms from '.';
import Atoms from '../atoms';
import Molecules from '../molecules';

interface Props {
  isModal?: boolean;
  initialValues?: ClubFormValues;
}

const defaultValues: ClubFormValues = {
  category: 0,
  title: '',
  description: '',
  max: Infinity,
  images: []
};

export default function ClubForm({ isModal, initialValues }: Props) {
  const router = useRouter();
  const clubId = useMemo(() => {
    if (router.query.id) {
      return +router.query.id;
    }
    return null;
  }, [router.query]);
  const queryClient = useQueryClient();
  const categories = useRecoilValue(categoryStates);
  const { addToast } = useToasts();
  const createClub = useMutation(ClubService.create, {
    cacheTime: 0,
    retry: false,
    onSuccess: () => {
      // To Do: create Toast Navigation
      addToast('success', '클럽 생성이 완료되었습니다.');
      queryClient.invalidateQueries(['clubList']);
      queryClient.invalidateQueries(['categories']);
      router.push('/');
    },
    onError: (error) => {
      console.log('클럽 생성 실패!');
      console.log(error);
    }
  });
  const updateClub = useMutation(ClubService.update, {
    cacheTime: 0,
    retry: false,
    onSuccess: () => {
      // To Do: create Toast Navigation
      addToast('success', '클럽 수정이 완료되었습니다.');
      queryClient.invalidateQueries(['clubList']);
      queryClient.invalidateQueries(['clubDetail']);
      queryClient.invalidateQueries(['categories']);
      router.push(`/clubs/${router.query.id}`);
    },
    onError: (error) => {
      console.log(error);
      addToast('error', '클럽 수정에 실패하였습니다.');
    }
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState,
    formState: { errors, isValid, dirtyFields }
  } = useForm({ defaultValues: initialValues || defaultValues });

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
      isValid: (v) => {
        return !!v;
      }
    }
  });

  const inputDescription = register('description', {
    required: true,
    validate: {
      isValid: (v) => {
        return !!v;
      }
    }
  });
  const inputMax = register('max', {
    required: true,
    min: 1,
    max: Infinity
  });

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

  const areUploadedNewImages = (
    imgs: {
      id?: boolean | undefined;
      imagePath?: boolean | undefined;
    }[]
  ) => imgs.some(({ id, imagePath }) => id && imagePath);

  const onSubmit = useCallback(
    (data: ClubFormValues) => {
      if (clubId && initialValues) {
        const payload: Partial<IClubBody> = {};

        for (const [key, value] of Object.entries(dirtyFields)) {
          if (key && value) {
            /* eslint-disable indent */
            switch (key) {
              case 'category':
                payload['categoryId'] = data.category;
                break;
              case 'title':
                payload['title'] = data.title;
                break;
              case 'description':
                payload['description'] = data.description;
                break;
              case 'images':
                if (Array.isArray(value)) {
                  if (areUploadedNewImages(value)) {
                    payload['imageIds'] = data.images.map((image) => image.id);
                  }
                }
                break;
            }
          }
        }

        if (initialValues['max'] !== data.max) {
          payload['max'] = data.max === Infinity ? 300 : data.max;
        }

        updateClub.mutate({
          id: clubId,
          payload
        });
        return;
      }

      const body: IClubBody = {
        categoryId: data.category,
        title: data.title,
        description: data.description,
        max: data.max === Infinity ? 300 : data.max,
        imageIds: data.images.map((image) => image.id)
      };
      createClub.mutate(body);
    },
    [isValid, dirtyFields, initialValues, formState]
  );

  const isFormValid = useMemo(() => {
    const { isValid, dirtyFields } = formState;

    if (initialValues) {
      let result = false;

      for (const [key, value] of Object.entries(dirtyFields)) {
        if (key === 'images' && Array.isArray(value)) {
          result = areUploadedNewImages(value);
        } else {
          if (key === 'title' && value && !getValues('title')) {
            result = false;
          } else {
            if (key === 'description' && value && !getValues('description')) {
              result = false;
            } else {
              result = !!value;
            }
          }
        }

        if (result) {
          return true;
        }
      }

      // max는 dirtyFields에 기록이 안됨. 라이브러리 버그로 추정
      const maxValue = getValues('max');
      if (maxValue === initialValues['max']) {
        result = false;
      } else {
        result = true;
      }

      return result;
    }

    return isValid;
  }, [initialValues, dirtyFields, isValid, formState]);

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
            disabled={!isFormValid}
            style={{
              backgroundColor: isFormValid ? '#ee2554' : '#EEEEEE',
              color: isFormValid ? '#fff' : '#AAAAAA'
            }}>
            {clubId ? '수정' : '등록'}
          </button>
        </section>
      </form>
    </>
  );
}
