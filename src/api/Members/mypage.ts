import { instance } from '@/api';
import { EditPassword, FailResponse, NewUserInfo, targetMemberInfo } from '@/typings/member.ts';
import { AxiosResponse } from 'axios';

export const changePassword: (
  data: EditPassword
) => Promise<targetMemberInfo | FailResponse> = async (data: EditPassword) => {
  const { password, newPassword } = data;

  const res = await instance.patch(`/members/password`, { password, newPassword });
  return res.data;
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
  const res: AxiosResponse<{ url: string }> = await instance.post('/storages/upload', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data.url;
};

export const updateMyInfo: (data: NewUserInfo) => Promise<targetMemberInfo> = async (
  data: NewUserInfo
) => {
  const { newName, newNickname, image } = data;

  const res = await instance.patch('/members/information', {
    newName,
    newNickname,
    image,
  });

  return res.data;
};
