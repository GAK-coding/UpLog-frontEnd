import { eachProduct } from '@/api/Product/Product.ts';
import { useQuery } from 'react-query';
import { Dispatch, SetStateAction } from 'react';
import { ProductsData } from '@/typings/product.ts';

type MessageType = 'success' | 'error' | 'warning';

export function useGetEachProduct(
  productId: number,
  showMessage: (type: MessageType, content: string) => void,
  setProductName?: Dispatch<SetStateAction<string>>,
  isEnabled = true
): [ProductsData | [], () => void] {
  const { refetch, data } = useQuery(['getProjectInfo', productId], () => eachProduct(productId), {
    onSuccess: (data) => {
      if (typeof data === 'object' && 'message' in data) {
        showMessage('error', '제품 정보를 불러오는데 실패했습니다.');
      } else if (typeof data !== 'string' && 'name' in data && setProductName) {
        setProductName(data.name);
      }
    },
    enabled: isEnabled,
    staleTime: 60000, // 1분
    cacheTime: 80000, // 1분 20초
    refetchOnMount: false, // 마운트(리렌더링)될 때 데이터를 다시 가져오지 않음
    refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
    refetchOnReconnect: false, // 네트워크가 다시 연결되었을때 다시 가져오지 않음
  });

  if (data && typeof data !== 'string' && 'teamId' in data) return [data, refetch];
  else return [[], refetch];
}
