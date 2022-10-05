import useToasts from '@/hooks/useToasts';
import { IToast } from '@/models/interfaces/UI/toast';
import { useEffect, useState } from 'react';
import Icons from '../icons';
import React from 'react';

function getToastStyle(type: 'success' | 'error'): {
  fill: string;
  color: string;
  backgroundColor: string;
  border: string;
} {
  if (type === 'success') {
    return {
      fill: '#64D7AB',
      color: '#264940',
      backgroundColor: '#EEF7F5',
      border: '1px solid #64D7AB'
    };
  }

  return {
    fill: '#D73F40',
    color: '#905152',
    backgroundColor: '#F5E9E8',
    border: '1px solid #D73F40'
  };
}

let autoTimer: NodeJS.Timeout | undefined = undefined;
interface Props extends IToast {
  index: number;
}

function Toast({ id, type, message, index }: Props) {
  const [toastClass, setToastClass] = useState('show');
  const { removeToast } = useToasts();
  const style = getToastStyle(type);
  const topPosition = `${index * 52 + 8 * (index + 1)}px`;

  const onClose = () => {
    let isClosing = false;
    return () => {
      if (!isClosing) {
        clearTimeout(autoTimer);
        setToastClass('');
        setTimeout(() => {
          removeToast(id);
        }, 350);
        isClosing = true;
      }
    };
  };

  useEffect(() => {
    autoTimer = setTimeout(() => {
      setToastClass('');
      setTimeout(() => {
        removeToast(id);
      }, 350);
    }, 3000);
  }, []);

  return (
    <li
      className={`absolute left-0 w-full toast ${toastClass}`}
      style={{
        backgroundColor: style.backgroundColor,
        border: style.border,
        top: topPosition
      }}>
      <section className='w-full h-full flex items-center px-2 relative'>
        <div className='w-4 h-4'>
          <Icons.ToastConfirm color={style.fill} />
        </div>
        <div className='flex-1 ml-2'>
          <p className='text-xs font-bold' style={{ color: style.color }}>
            {message}
          </p>
        </div>
        <div className='absolute top-1/2 -translate-y-1/2 right-2 w-5 h-5'>
          <button className='w-full h-full' onClick={onClose()}>
            <Icons.ToastClose />
          </button>
        </div>
      </section>
    </li>
  );
}

export default React.memo(Toast, (prev, next) => {
  return !(prev.id === next.id);
});
