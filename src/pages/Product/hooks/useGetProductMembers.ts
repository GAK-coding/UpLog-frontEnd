import { getProductMemberList } from '@/api/Product/Product.ts';
import { ProductMember } from '@/typings/product.ts';
import { useQuery } from 'react-query';

export function useGetProductMembers(productId: number) {
  const { data, isSuccess, refetch } = useQuery(
    ['getProductMemberList', productId],
    () => getProductMemberList(productId),
    {
      select: (data) => {
        if (typeof data !== 'string') {
          const temp: ProductMember[] = [];
          data.forEach((member) => {
            temp.push({
              ...member,
              isOpen: false,
            });
          });

          const powerTypePriority = {
            MASTER: 1,
            LEADER: 2,
            CLIENT: 3,
            DEFAULT: 4,
          };

          const sortedData = temp.sort((a, b) => {
            const priorityA = powerTypePriority[a.powerType];
            const priorityB = powerTypePriority[b.powerType];
            return priorityA - priorityB;
          });

          return sortedData;
        }
      },
      staleTime: 60000, // 1분
      cacheTime: 80000, // 1분 20초
      refetchOnMount: false, // 마운트(리렌더링)될 때 데이터를 다시 가져오지 않음
      refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
      refetchOnReconnect: false, // 네트워크가 다시 연결되었을때 다시 가져오지 않음
    }
  );

  return [data, isSuccess, refetch];
}
