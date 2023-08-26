import { instance } from '@/api';

export const sendLog = async (data: { page: string; status: boolean; message: string }) => {
  try {
    await instance.post('/log', data);

    return 'success log';
  } catch (err) {
    return 'fail log';
  }
};
