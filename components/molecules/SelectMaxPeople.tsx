import usePrevious from '@/hooks/usePrevious';
import { ClubFormValues } from '@/models/interfaces/props/ClubFormValues';
import { useCallback } from 'react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import Atoms from '../atoms';

interface Props {
  getValues: UseFormGetValues<ClubFormValues>;
  setValue: UseFormSetValue<ClubFormValues>;
}

export default function SelectMaxPeople({ getValues, setValue }: Props) {
  const isMaxInfinity = getValues('max') === Infinity;
  const previousMax = usePrevious(getValues('max'), {
    preventUpdate: isMaxInfinity,
    initialValue: 4
  });

  const onMinusMax = useCallback(() => {
    const newValue = isMaxInfinity ? previousMax : getValues('max');

    if (newValue > 2) {
      setValue('max', newValue - 1, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });
      return;
    }

    setValue('max', 2, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  }, [getValues('max')]);

  const onResetMax = useCallback(() => {
    const newValue = isMaxInfinity ? previousMax : getValues('max');
    setValue('max', newValue, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  }, [getValues('max')]);

  const onPlusMax = useCallback(() => {
    const newValue = isMaxInfinity ? previousMax : getValues('max');
    setValue('max', newValue + 1, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  }, [getValues('max')]);

  return (
    <>
      <Atoms.SelectInfinityButton
        setValue={setValue}
        isMaxInfinity={isMaxInfinity}
      />
      <Atoms.ControlPeopleButton
        getValues={getValues}
        isMaxInfinity={isMaxInfinity}
        previousMax={previousMax}
        onPlusMax={onPlusMax}
        onResetMax={onResetMax}
        onMinusMax={onMinusMax}
      />
    </>
  );
}
