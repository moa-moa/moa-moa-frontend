import { IPhoto } from '@/models/interfaces/data/Photo';
import PhotoService from '@/services/photo.service';
import React, { ChangeEvent, MouseEvent, useCallback, useRef } from 'react';
import Icons from '../icons';
import {
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFieldArraySwap,
  UseFormRegisterReturn
} from 'react-hook-form';
import { ClubFormValues } from '@/models/interfaces/props/ClubFormValues';
import Atoms from '../atoms';

interface Props {
  photos: IPhoto[];
  inputImages: UseFormRegisterReturn<'images'>;
  addImage: UseFieldArrayAppend<ClubFormValues, 'images'>;
  removeImage: UseFieldArrayRemove;
  swapImage: UseFieldArraySwap;
}

export default function UploadPhotos({
  photos,
  inputImages,
  addImage,
  removeImage,
  swapImage
}: Props) {
  const uploadRef = useRef<HTMLInputElement | null>(null);

  const onUpload = useCallback(() => {
    if (photos.length >= 10) {
      alert('사진은 10장 까지만 올릴 수 있습니다.');
      return;
    }

    if (uploadRef) {
      uploadRef.current!.value = '';
      uploadRef.current!.click();
    }
  }, [photos]);

  const onFileChange = useCallback(
    async (event: ChangeEvent) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;

      if (files && files.length) {
        if (files.length + photos.length > 10) {
          alert('사진은 10장 까지만 올릴 수 있습니다.');
          return;
        }
        const { data: uploadedImages } = await PhotoService.uploadClubPhoto(
          files
        );

        for (let i = 0; i < uploadedImages.length; i++) {
          const image = uploadedImages[i];
          addImage(image);
        }
      }
    },
    [photos]
  );

  const onDeletePhoto = useCallback((event: MouseEvent, index: number) => {
    if (event.stopPropagation) {
      event.stopPropagation();
    }

    removeImage(index);
  }, []);

  return (
    <>
      <div className='flex items-end mb-2.5'>
        <h6 className='text-sm font-bold mr-1'>사진 업로드</h6>
        <div className='text-xs text-gray leading-[1.2rem]'>
          (선택, 최대 10장)
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
            ref={(e) => {
              inputImages.ref(e);
              uploadRef.current = e;
            }}
            onChange={onFileChange}
          />
        </section>
        <Atoms.Photos
          photos={photos}
          onDeletePhoto={onDeletePhoto}
          swapImage={swapImage}
        />
      </div>
    </>
  );
}
