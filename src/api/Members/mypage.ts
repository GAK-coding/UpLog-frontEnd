import { instance } from '@/api';

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

    await instance.patch(`/members/${id}/password`, { password, newPassword });
  } catch (err) {
    return 'change password fail';
  }
};
