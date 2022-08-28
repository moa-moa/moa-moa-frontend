import { useEffect, useRef, useState } from 'react';

interface Options<T> {
  initialValue?: T;
  preventUpdate?: boolean;
}

export default function usePrevious<T>(value: T, options: Options<T>): T {
  const [first, setFirst] = useState<boolean>(true);
  const ref = useRef<T>(first ? options.initialValue || value : value);
  useEffect(() => {
    if (first) {
      setFirst(false);
    }
    if (options.preventUpdate) {
      return;
    }
    ref.current = value;
  }, [value]);

  return ref.current;
}
