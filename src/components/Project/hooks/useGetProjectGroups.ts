import { useQuery } from 'react-query';
import { getProjectGroups } from '@/api/Project/Version.ts';

export function useGetProjectGroups(projectId: number) {
  const { data } = useQuery(['getProjectGroups', projectId], () => getProjectGroups(projectId), {
    staleTime: 300000, // 5분
    cacheTime: 600000, // 10분
    refetchOnMount: false, // 마운트(리렌더링)될 때 데이터를 다시 가져오지 않음
    refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
    refetchOnReconnect: false, // 네트워크가 다시 연결되었을때 다시 가져오지 않음
  });

  if (data && typeof data !== 'string') {
    return data;
  } else return [];
}
