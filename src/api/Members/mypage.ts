import { instance } from '@/api';
import { GetUserInfo } from '@/typings/member.ts';
import { AxiosResponse } from 'axios';
import message from 'antd/lib/message';

export const changeName = async (data: { id: number; newName: string }) => {
  try {
    const { newName, id } = data;

    await instance.patch(`/members/${id}/name`, { newName });
  } catch (err) {
    return 'change name fail';
  }
};

export const changeNickname = async (data: { id: number; newNickname: string }) => {
  try {
    const { newNickname, id } = data;

    await instance.patch(`/members/${id}/nickname`, { newNickname });
  } catch (err) {
    return 'change nickname fail';
  }
};

export const changePassword = async (data: {
  id: number;
  newPassword: string;
  password: string;
}) => {
  try {
    const { password, newPassword, id } = data;

    const res = await instance.patch(`/members/password`, { password, newPassword });

    if ('message' in res.data) {
      return res.data;
    }
  } catch (err) {
    return 'change password fail';
  }
};

export const deleteAccount = async (data: {
  id: number;
  accessToken: string;
  refreshToken: string;
  password: string;
}) => {
  try {
    const { id, accessToken, refreshToken, password } = data;

    const res: AxiosResponse<string | { message: string }> = await instance.delete(
      `/members/${id}`,
      {
        data: { password, accessToken, refreshToken },
      }
    );

    return res.data;
  } catch (err) {
    return 'delete account fail';
  }
};

export const imageUpload = async (data: FormData) => {
  try {
    const res: AxiosResponse<{ url: string }> = await instance.post('/storages/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return res.data.url;
  } catch (err) {
    return null;
  }
};

export const updateMyInfo = async (data: {
  newName: string | null;
  newNickname: string | null;
  image: string | null;
}) => {
  try {
    const { newName, newNickname, image } = data;

    await instance.patch('/members/information', {
      newName,
      newNickname,
      image,
    });
  } catch (err) {
    return 'fail updateMyInfo';
  }
};
