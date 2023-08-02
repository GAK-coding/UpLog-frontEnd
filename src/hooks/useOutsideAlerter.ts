import { RefObject, useEffect } from 'react';
import { productOpen } from '../recoil/Product/atom.tsx';
import { useRecoilState } from 'recoil';
import { profileOpen } from '../recoil/User/atom.tsx';

/** useOutsideAlertert는 header click 모달창 클릭 이벤트를 처리하는 훅이다. **/

export function useOutsideAlerter(clickRef: RefObject<HTMLElement>, title: string) {
  const [isProductClick, setIsProductClick] = useRecoilState(productOpen);
  const [isProfileClick, setIsProfileClick] = useRecoilState(profileOpen);

  // 외부 클릭시 창 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (clickRef.current && !clickRef.current.contains(e.target as Node)) {
        if (title === 'product') {
          setIsProductClick(false);
        } else if (title === 'profile') {
          setIsProfileClick(false);
        }
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [clickRef]);
}
