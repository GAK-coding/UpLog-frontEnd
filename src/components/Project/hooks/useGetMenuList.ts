import { MenuInfo } from '@/typings/menu.ts';
import { useRecoilState } from 'recoil';
import { menuListData } from '@/recoil/Project/Menu.ts';
import { projectMenuList } from '@/api/Project/Menu.ts';
import { useQuery } from 'react-query';
import { useEffect } from 'react';

export function useGetMenuList(
  projectId: number
): [data: MenuInfo[], isLoading: boolean, isFetching: boolean] {
  const [menuList, setMenuList] = useRecoilState(menuListData);

  const getMenuList = useQuery(['menuList', projectId], () => projectMenuList(projectId), {
    staleTime: 60000, // 10분
    cacheTime: 80000,
    refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
    enabled: true,
  });

  useEffect(() => {
    if (getMenuList.data !== undefined) {
      if (typeof getMenuList.data !== 'string') {
        setMenuList(getMenuList.data);
      }
    }
  }, [getMenuList.data]);

  return [menuList, getMenuList.isLoading, getMenuList.isFetching];
}
