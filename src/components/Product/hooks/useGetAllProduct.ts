import { getMyProducts } from '@/api/Product/Product.ts';
import { GetProductList, ProductInfo } from '@/typings/product.ts';
import { useQuery } from 'react-query';

export function useGetAllProduct(isEnabled = true): [ProductInfo[] | [], () => void, boolean] {
  const { refetch, data, isError, isFetching } = useQuery('myProductList', getMyProducts, {
    select: (data) => {
      if (typeof data !== 'string') {
        const list: ProductInfo[] = data.map((item: GetProductList) => {
          return {
            productId: item.productId,
            productName: item.productName,
            powerType: item.powerType,
            indexNum: item.indexNum,
            draggableId: item.productId.toString(),
            // TODO: 이미지 수정 필요
            image: !item.productImage ? '/images/test_userprofile.png' : item.productImage,
            productImage: !item.productImage ? null : item.productImage,
          };
        });

        return list;
      }
    },
    enabled: isEnabled,
    staleTime: 60000, // 1분
    cacheTime: 80000, // 1분 20초
    refetchOnMount: false, // 마운트(리렌더링)될 때 데이터를 다시 가져오지 않음
    refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
    refetchOnReconnect: false, // 네트워크가 다시 연결되었을때 다시 가져오지 않음
  });

  if (isError) return [[], refetch, isFetching];

  if (data) return [data, refetch, isFetching];
  else return [[], refetch, isFetching];
}
