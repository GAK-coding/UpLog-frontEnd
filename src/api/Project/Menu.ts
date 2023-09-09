import { AxiosResponse } from 'axios';
import { FailMenu, MenuInfo } from '@/typings/menu.ts';
import { instance } from '@/api';

// 프로젝트에 해당하는 메뉴 리스트 get
export const projectMenuList = async (projectId: number) => {
  try {
    const res: AxiosResponse<MenuInfo[]> = await instance.get(`/menus/${projectId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'get project menu list fail';
  }
};

// 메뉴 생성
export const createMenu = async (projectId: number, menuName: string) => {
  try {
    const res: AxiosResponse<string | FailMenu> = await instance.post(`/menus/${projectId}`, {
      menuName: menuName,
    });

    return res.data;
  } catch (error) {
    return 'create menu fail';
  }
};

// 메뉴 이름 수정
export const editMenu = async (menuId: number, updatemenuName: string) => {
  try {
    const res: AxiosResponse<string | FailMenu> = await instance.patch(
      `/menus/${menuId}/menuname`,
      {
        updatemenuName: updatemenuName,
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return 'edit menu name fail';
  }
};

// 메뉴 삭제
export const deleteMenu = async (menuId: number) => {
  try {
    const res: AxiosResponse<string> = await instance.delete(`/menus/${menuId}`);

    return res.data;
  } catch (error) {
    console.log(error);
    return 'delete menu fail';
  }
};
