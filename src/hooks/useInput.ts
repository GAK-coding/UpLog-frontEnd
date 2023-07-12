import { Dispatch, SetStateAction, useCallback, useState, ChangeEvent } from 'react';

type ReturnTypes<T = ChangeEvent<HTMLInputElement>> = [
  T,
  (e: ChangeEvent<HTMLInputElement>) => void,
  Dispatch<SetStateAction<T>>
];

/** useInput은 useState에서 onChange 함수까지 간편하게 적용할 수 있는 커스텀 훅이다. **/
const useInput = <T = ChangeEvent<HTMLInputElement>>(initialValue: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e: any) => {
    setValue(e.target.value as unknown as T);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
