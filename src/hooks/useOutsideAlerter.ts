import { RefObject, useEffect, useRef } from 'react';
import { productOpen } from '../recoil/Product/atom.tsx';
import { useRecoilState } from 'recoil';

export function useOutsideAlerter() {
  const [isProductClick, setIsProductClick] = useRecoilState(productOpen);
  const clickRef = useRef<HTMLElement>(null);

  // 외부 클릭시 창 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (clickRef.current && !clickRef.current.contains(e.target as Node)) {
        setIsProductClick(!isProductClick);
        console.log('클릭');
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [clickRef]);

  return clickRef;
}
