import { MenuInfo } from '@/typings/menu.ts';
import { atom } from 'recoil';

export const menuListData = atom<MenuInfo[]>({
  key: 'menuList',
  default: [
    { id: 1, menuName: '결과물', projectId: 1, version: '1.0.0' },
    { id: 2, menuName: '요구사항', projectId: 1, version: '1.0.0' },
    { id: 3, menuName: '개발', projectId: 1, version: '1.0.0' },
    { id: 4, menuName: '배포', projectId: 1, version: '1.0.0' },
    { id: 5, menuName: '개발2', projectId: 1, version: '1.0.0' },
    { id: 6, menuName: '배포2', projectId: 1, version: '1.0.0' },
  ],
});
