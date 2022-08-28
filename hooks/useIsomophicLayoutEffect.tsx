import { useEffect, useLayoutEffect } from 'react';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
);
export default canUseDOM ? useLayoutEffect : useEffect;
